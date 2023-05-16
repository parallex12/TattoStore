import React, { useEffect, useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { handleTimer, pad } from "./helper";
import {
  updateSession,
  getAllAppiontments,
} from "../../../state-management/actions/Features/Actions";
import { useNavigation } from "@react-navigation/native";

const Form = (props) => {
  let { currentSession, setIsSignatureModuleOpen } = props;
  let color = props?.color_scheme;
  const [loading, setLoading] = useState(false);
  const [sessionDetails, setSessionDetails] = useState(null);
  const [timerStatus, setTimerStatus] = useState(null);
  const [countingSeconds, setCountingSeconds] = useState(0);
  const [completedTime, setCompletedTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timer, setTimer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  let navigation = useNavigation();
  let clientDetails = sessionDetails?.clientSelected?.data;
  let agentDetails = sessionDetails?.agentDetails?.data;
  let totalBalanceByHour =
    sessionDetails?.agentDetails?.data?.sessionRate * completedTime?.seconds;
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = 0;
    return { hours, minutes, seconds };
  };
  let remainingPayment = sessionDetails?.budget - sessionDetails?.paymentPrice;

  useEffect(() => {
    if (currentSession != null) {
      setSessionDetails(currentSession?.data);
      setTimerStatus(null);
    }
  }, [currentSession]);

  useEffect(() => {
    if (timerStatus == "stop") {
      return;
    }
    if (timerStatus == "finish") {
      console.log(timer);
      setCompletedTime(timer);
      setTimer({ hours: 0, minutes: 0, seconds: 0 });
      setCountingSeconds(0);
      setTimerStatus(null);
      return;
    }
    if (timerStatus == "play") {
      console.log("TIMER RUNNING=>>>>>>>>>>>");
      setTimeout(() => {
        setCountingSeconds((prev) => prev + 1000);
        handleTimer(setTimer, timer, timerStatus, countingSeconds);
      }, 1000);
    }
  }, [countingSeconds, timerStatus]);

  const onChangePriceMode = () => {
    if (props?.currentSession != null && props?.customerSignature != null) {
      props?.setSessionPriceMode(
        props?.sessionPriceMode == "Timer" ? "Fixed" : "Timer"
      );
    } else {
      alert(props?.currentSession != null ? "Do Signature" : "Select session.");
    }
  };

  const onSelectSession = () => {
    props?.setIsSessionModalOpen(!props?.isSessionModalOpen);
  };

  const onCompleteJob = async () => {
    if (currentSession != null) {
      sessionDetails["status"] = "completed";
      if (props?.sessionPriceMode == "Timer") {
        sessionDetails["totalTiming"] = completedTime;
        sessionDetails["totalPrice"] = totalBalanceByHour;
      } else {
        sessionDetails["totalPrice"] = sessionDetails?.servicePrice;
      }
      setLoading(true);
      await props?.updateSession(
        sessionDetails,
        currentSession?.id,
        setLoading,
        navigation
      );
      props?.getAllAppiontments(setLoading);
      setTimer({ hours: 0, minutes: 0, seconds: 0 });
      setTimerStatus(null);
      setCountingSeconds(0);
    }
  };

  const styles = StyleSheet.create({
    formWrapper: {
      width: wp("29%"),
      height: hp("65%"),
      alignItems: "center",
      justifyContent: "space-around",
    },
    formBtnWrapper: {
      width: "90%",
      height: hp("4%"),
      borderRadius: 5,
      backgroundColor: color?.buttonPrimary,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: "5%",
      marginBottom: hp("0.5%"),
    },
    formBtnText: {
      color: color?.buttonText,
      fontSize: rf(7),
      fontFamily: "IS",
    },
    formFieldWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "90%",
      height: hp("4.5%"),
      padding: 10,
      borderWidth: 2,
      borderColor: color?.bgBorder,
      marginHorizontal: "5%",
      marginBottom: hp("0.5%"),
      borderRadius: 5,
    },
    checkBoxLabel: {
      marginLeft: 10,
      color: color?.text,
      fontSize: rf(6),
      fontFamily: "IS",
    },
    fieldLabel: {
      color: color?.text,
      fontSize: rf(7),
      fontFamily: "IS",
      textAlign: "left",
      flex: 1,
      paddingLeft: 15,
    },
    RowFieldsWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginVertical: 5,
    },
    textFieldText: {
      color: color?.text,
      fontSize: rf(7),
      fontFamily: "IS",
      width: "100%",
    },
    fieldWrapper2: {
      width: "90%",
      borderRadius: 5,
      justifyContent: "center",
    },
    fieldType2: {
      borderBottomWidth: 2,
      borderBottomColor: color?.bgBorder,
      height: hp("2%"),
      alignItems: "center",
      justifyContent: "center",
    },
    fieldLabel2: {
      color: color?.text,
      fontSize: rf(7),
      fontFamily: "IS",
      width: "100%",
    },
    timerText: {
      color: color?.buttonText,
      fontSize: hp("4%"),
      fontFamily: "IB",
      letterSpacing: 3,
    },
    actionButtonsWrapper: {
      flexDirection: "row",
      marginHorizontal: "4%",
      marginVertical: 4,
      alignItems: "center",
      justifyContent: "space-between",
    },
    actionButtons: {
      height: hp("3%"),
      marginHorizontal: "1%",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color?.buttonPrimary,
      paddingHorizontal: wp("2%"),
    },
  });

  return (
    <>
      {/* Form starts here */}
      <View style={styles.formWrapper}>
        <TouchableOpacity
          onPress={onSelectSession}
          style={[styles.formFieldWrapper, { marginTop: hp("0.5%") }]}
        >
          <View>
            {props?.buscarCita ? (
              <MaterialIcons
                name="check-box"
                size={20}
                color={color?.buttonPrimary}
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank"
                size={20}
                color={color?.bgBorder}
              />
            )}
          </View>
          <Text style={styles.checkBoxLabel}>
            {sessionDetails?.category || "Buscar cita"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.formBtnWrapper}
          onPress={() => onChangePriceMode()}
        >
          <Text style={styles.formBtnText}>Cecion por tiempo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.formBtnWrapper, { height: hp("5%") }]}
          onPress={() => setIsSignatureModuleOpen((prev) => !prev)}
        >
          <Text style={styles.formBtnText}>Firmar concentimento</Text>
        </TouchableOpacity>

        <View style={[styles.RowFieldsWrapper, { marginTop: hp("0.5%") }]}>
          <Text style={styles.fieldLabel}>Tatuador o Anillador</Text>
          <Text style={styles.fieldLabel}>Servicos</Text>
        </View>
        <View style={styles.RowFieldsWrapper}>
          <View
            style={[
              styles.formFieldWrapper,
              { flex: 1, marginRight: "1.5%", height: hp("3.5%") },
            ]}
          >
            <TextInput
              style={styles.textFieldText}
              value={agentDetails?.name || " "}
            />
          </View>
          <View
            style={[
              styles.formFieldWrapper,
              { flex: 1, marginLeft: "1.5%", height: hp("3.5%") },
            ]}
          >
            <TextInput
              style={styles.textFieldText}
              value={sessionDetails?.category || ""}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: "5%",
            marginVertical: 5,
          }}
        >
          <View style={[styles.fieldWrapper2, { flex: 1, paddingRight: "2%" }]}>
            <Text style={styles.fieldLabel2}>Nombre Client</Text>
            <View style={styles.fieldType2}>
              <TextInput
                style={styles.textFieldText}
                value={clientDetails?.name || ""}
              />
            </View>
          </View>
          <View style={[styles.fieldWrapper2, { flex: 1, paddingLeft: "2%" }]}>
            <Text style={styles.fieldLabel2}>Apellidos</Text>
            <View style={styles.fieldType2}>
              <TextInput
                style={styles.textFieldText}
                value={clientDetails?.surname || ""}
              />
            </View>
          </View>
        </View>

        <View
          style={[
            styles.fieldWrapper2,
            { marginHorizontal: "5%", marginTop: 5 },
          ]}
        >
          <Text style={styles.fieldLabel2}>
            Información de Pago de la reserva
          </Text>
          <View style={styles.fieldType2}>
            <TextInput
              style={styles.textFieldText}
              value={sessionDetails?.serviceNotes || ""}
            />
          </View>
        </View>

        <View style={[styles.RowFieldsWrapper, { marginTop: hp("0.5%") }]}>
          {props?.sessionPriceMode == "Timer" ? (
            <>
              <Text style={styles.fieldLabel}>Precio deposito</Text>
              <Text style={styles.fieldLabel}>Tarifa por hora </Text>
            </>
          ) : (
            <>
              <Text style={styles.fieldLabel}>Método de Pago </Text>
              <Text style={styles.fieldLabel}>Precio deposito</Text>
            </>
          )}
        </View>
        <View style={styles.RowFieldsWrapper}>
          {props?.sessionPriceMode == "Timer" ? (
            <>
              <View
                style={[
                  styles.formFieldWrapper,
                  { flex: 1, marginRight: "1.5%", height: hp("3.5%") },
                ]}
              >
                <TextInput
                  style={styles.textFieldText}
                  editable={false}
                  value={sessionDetails?.paymentPrice}
                />
              </View>
              <View
                style={[
                  styles.formFieldWrapper,
                  { flex: 1, marginLeft: "1.5%", height: hp("3.5%") },
                ]}
              >
                <TextInput
                  style={styles.textFieldText}
                  value={sessionDetails?.agentDetails?.data?.sessionRate}
                  editable={false}
                />
              </View>
            </>
          ) : (
            <>
              <View
                style={[
                  styles.formFieldWrapper,
                  { flex: 1, marginRight: "1.5%", height: hp("3.5%") },
                ]}
              >
                <TextInput
                  style={styles.textFieldText}
                  value={sessionDetails?.paymentMethod || ""}
                  editable={false}
                />
              </View>
              <View
                style={[
                  styles.formFieldWrapper,
                  { flex: 1, marginLeft: "1.5%", height: hp("3.5%") },
                ]}
              >
                <TextInput
                  style={styles.textFieldText}
                  editable={false}
                  value={
                    props?.sessionPriceMode == "Timer"
                      ? sessionDetails?.agentDetails?.data?.sessionRate
                      : sessionDetails?.paymentPrice
                  }
                />
              </View>
            </>
          )}
        </View>

        {props?.sessionPriceMode == "Timer" && (
          <>
            <View
              style={[
                styles.formBtnWrapper,
                {
                  height: hp("6%"),
                  backgroundColor:
                    timerStatus == "stop" ? "red" : color?.buttonPrimary,
                },
              ]}
            >
              <View style={{ alignItems: "baseline", flexDirection: "row" }}>
                <Text style={styles.timerText}>{`${pad(timer?.hours)}:${pad(
                  timer?.minutes
                )}`}</Text>
                <Text style={[styles.timerText, { fontSize: hp("2%") }]}>
                  {pad(timer?.seconds)}
                </Text>
              </View>
            </View>
            <View style={styles.actionButtonsWrapper}>
              <TouchableOpacity
                style={styles.actionButtons}
                onPress={() => currentSession != null && setTimerStatus("play")}
              >
                <Text style={styles.formBtnText}>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButtons}
                onPress={() => currentSession != null && setTimerStatus("stop")}
              >
                <Text style={styles.formBtnText}>Pausa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButtons}
                onPress={() =>
                  currentSession != null && setTimerStatus("finish")
                }
              >
                <Text style={styles.formBtnText}>Terminar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View
          style={[
            styles.fieldWrapper2,
            { marginHorizontal: "5%", marginVertical: 5 },
          ]}
        >
          <Text style={[styles.fieldLabel2, { marginVertical: 2 }]}>
            Precio restante de pagar
          </Text>
          <View style={[styles.fieldType2, { height: hp("3%") }]}>
            <TextInput
              style={styles.textFieldText}
              placeholder="$0"
              placeholderTextColor={color?.text}
              value={
                props?.sessionPriceMode == "Timer"
                  ? "€" +
                    eval(
                      totalBalanceByHour - sessionDetails?.paymentPrice
                    )?.toString()
                  : "€" + remainingPayment.toString()
              }
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.formBtnWrapper, { marginVertical: hp("0.5%") }]}
          onPress={() => onCompleteJob()}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.formBtnText}>
              Terminar la cita Imprimir Tique
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {/* Form ends here */}
    </>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});

export default connect(mapStateToProps, { updateSession, getAllAppiontments })(
  Form
);

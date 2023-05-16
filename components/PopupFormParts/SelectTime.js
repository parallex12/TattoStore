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
} from "react-native";
import { connect } from "react-redux";

const SelectTime = (props) => {
  let color = props?.color_scheme;
  const [startTimeHours, setStartTimeHours] = useState(null);
  const [startTimeMinutes, setStartTimeMinutes] = useState(null);
  const [endTimeHours, setEndTimeHours] = useState(null);
  const [endTimeMinutes, setEndTimeMinutes] = useState(null);

  let calendarSelectedTime = props?.formData?.bookingTiming?.selectedTime;
  useEffect(() => {
    if (props?.formData?.bookingTiming?.selectedTime != null) {
      setStartTimeHours(calendarSelectedTime.from?.slice(0, 2));
      setStartTimeMinutes(calendarSelectedTime.from?.slice(3));
      setEndTimeHours(calendarSelectedTime.to?.slice(0, 2));
      setEndTimeMinutes(calendarSelectedTime.to?.slice(3));
    }
  }, [props?.formData]);

  useEffect(() => {}, [
    startTimeHours,
    startTimeMinutes,
    endTimeHours,
    endTimeMinutes,
  ]);

  const styles = StyleSheet.create({
    formFieldStyle4Wrapper: {
      width: "100%",
      height: hp("7%"),
      borderRadius: 6,
      borderColor: color?.text,
      borderWidth: 0.5,
      marginTop: hp("1%"),
      zIndex: -1,
    },
    formFieldStyle4InnerWrapper: {
      flex: 1,
      borderColor: color?.text,
      borderBottomWidth: 0.5,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: "2%",
    },
    formFieldStyle4InnerLabel: {
      color: color?.text,
      fontSize: rf(6),
      fontFamily: "IR",
    },
    formFieldStyle4InnerTimeFieldWrapper: {
      width: "21%",
      height: "80%",
      borderWidth: 1,
      borderColor: color?.bgBorder,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 5,
      flexDirection: "row",
    },
    formFieldStyle4InnerTimeField: {
      color: color?.text,
      fontSize: rf(6.5),
      fontFamily: "IR",
      textAlign: "center",
    },
    formFieldStyle4InnerTimeFieldColun: {
      color: color?.text,
      fontSize: rf(7),
      fontFamily: "IR",
      bottom: 1,
    },
  });

  return (
    <View style={styles.formFieldStyle4Wrapper}>
      <View style={styles.formFieldStyle4InnerWrapper}>
        <Text style={styles.formFieldStyle4InnerLabel}>Hora de Inicio</Text>
        <View style={styles.formFieldStyle4InnerTimeFieldWrapper}>
          <TextInput
            style={styles.formFieldStyle4InnerTimeField}
            placeholder="11"
            defaultValue={startTimeHours}
            maxLength={2}
            onChangeText={(val) =>
              val <= 20 && val >= 11 && val != ""
                ? setStartTimeHours(val)
                : console.log("Invalid Time")
            }
            placeholderTextColor={color?.text}
          />
          <Text style={styles.formFieldStyle4InnerTimeFieldColun}>:</Text>
          <TextInput
            style={styles.formFieldStyle4InnerTimeField}
            placeholder="00"
            defaultValue={startTimeMinutes}
            maxLength={2}
            onChangeText={(val) =>
              val > 60 || (val < 1 && val != "")
                ? console.log("Invalid Time")
                : setStartTimeMinutes(val)
            }
            placeholderTextColor={color?.text}
          />
        </View>
      </View>
      <View
        style={[styles.formFieldStyle4InnerWrapper, { borderBottomWidth: 0 }]}
      >
        <Text style={styles.formFieldStyle4InnerLabel}>
          Hora de Finalización
        </Text>
        <View style={styles.formFieldStyle4InnerTimeFieldWrapper}>
          <TextInput
            style={styles.formFieldStyle4InnerTimeField}
            placeholder="11"
            maxLength={2}
            defaultValue={endTimeHours}
            onChangeText={(val) =>
              val > 24 || (val < 1 && val != "")
                ? alert("Invalid Time")
                : setEndTimeHours(val)
            }
            placeholderTextColor={color?.text}
          />
          <Text style={styles.formFieldStyle4InnerTimeFieldColun}>:</Text>
          <TextInput
            style={styles.formFieldStyle4InnerTimeField}
            placeholder="00"
            maxLength={2}
            defaultValue={endTimeMinutes}
            onChangeText={(val) =>
              val > 60 || (val < 1 && val != "")
                ? alert("Invalid Time")
                : setEndTimeMinutes(val)
            }
            placeholderTextColor={color?.text}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});
export default connect(mapStateToProps, {})(SelectTime);

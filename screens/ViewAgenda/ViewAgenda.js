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
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import {
  editAgendaPopup,
  deleteAppiontment,
  getAllAppiontments,
} from "../../state-management/actions/Features/Actions";
import EditAgendaPopup from "../../components/EditAgendaPopup";
import { AntDesign } from "@expo/vector-icons";

const ViewAgenda = (props) => {
  let color = props?.color_scheme;
  let data = props?.route.params?.data?.data;
  let id = props?.route.params?.data?.id;

  let index = data?.tattooImage.indexOf(".comid");
  let index2 = data?.tattooImage.indexOf(".jpg");
  let imageID = data?.tattooImage.slice(index + 6, index2);
  const [appiontments, setAppiontments] = useState([]);
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color?.bg,
    },
    loader: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    body: {
      width: wp("100%"),
      flex: 1,
      flexDirection: "row",
    },
    contentWrapper: {
      flex: 1,
    },
    tatooImageWrapper: {
      width: "100%",
      height: hp("69%"),
      paddingHorizontal: wp("3%"),
      paddingVertical: hp("2%"),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    tatooImg: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
    },
    orderDetailsWrapper: {
      width: "95%",
      height: hp("18%"),
      paddingHorizontal: wp("3%"),
      paddingVertical: hp("1.5%"),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: color?.primaryBackground,
      borderRadius: 10,
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    orderDetailCol: {
      width: "17%",
      height: "90%",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    detailTitle: {
      color: color?.text,
      fontSize: rf(9),
      fontFamily: "IB",
      flex: 1,
    },
    detailText: {
      color: color?.text,
      fontSize: rf(8),
      fontFamily: "IR",
      marginBottom: 7,
    },
    detailTextWrapper: {
      flex: 1,
    },
    profileWrapper: {
      width: wp("6%"),
      height: wp("6%"),
      borderRadius: 100,
      //   overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    editBtn: {
      width: "80%",
      height: hp("4%"),
      borderRadius: 5,
      backgroundColor: color?.buttonSecondary,
      alignItems: "center",
      justifyContent: "center",
    },
    editBtnText: {
      color: color?.buttonText,
      fontSize: rf(7),
      fontFamily: "IB",
    },
    actionWrapper: {
      width: "17%",
      height: "90%",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
    deleteBtn: {
      width: wp("3%"),
      height: wp("3%"),
      borderRadius: 100,
      backgroundColor: "#ff5252",
      position: "absolute",
      right: wp("2.5%"),
      zIndex: 99999,
      top: 10,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const onDeleteAppiontment = () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to delete this appiontment?",
      [
        {
          text: "Yes",
          onPress: () => {
            setLoading(true);
            props?.deleteAppiontment(id,props?.navigation,setLoading);
            props?.getAllAppiontments(setLoading);
          },
        },
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <EditAgendaPopup
        imageID={imageID}
        navigation={props?.navigation}
        prevData={data}
        docId={id}
      />
      <Header type="worker" />
      <View style={styles.body}>
        <SideMenu active="Dashboard" navigation={props?.navigation} />
        {loading ? (
          <ActivityIndicator
            style={{ alignSelf: "center", flex: 1 }}
            size="large"
            color="#222"
          />
        ) : (
          <View style={styles.contentWrapper}>
            <ScrollView>
              <View style={styles.tatooImageWrapper}>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={onDeleteAppiontment}
                >
                  <AntDesign
                    name="delete"
                    size={wp("1.6%")}
                    color={color?.buttonText}
                  />
                </TouchableOpacity>
                <Image
                  source={{ uri: data?.tattooImage }}
                  style={styles.tatooImg}
                />
              </View>
              <View style={styles.orderDetailsWrapper}>
                {/* Col starts here */}
                <View style={styles.orderDetailCol}>
                  <Text style={styles.detailTitle}>Tatuaje</Text>
                  <View style={styles?.detailTextWrapper}>
                    <Text style={styles.detailText}>{data?.bookingDate}</Text>
                    <Text style={styles.detailText}>
                      {data?.bookingTiming?.selectedTime?.from +
                        " - " +
                        data?.bookingTiming?.selectedTime?.to}
                    </Text>
                  </View>
                </View>
                {/* Col starts here */}
                <View style={styles.orderDetailCol}>
                  <Text style={styles.detailTitle}>Cliente</Text>
                  <View style={styles?.detailTextWrapper}>
                    <Text style={styles.detailText}>{data?.name}</Text>
                    <Text style={styles.detailText}>{data?.phoneNumber}</Text>
                  </View>
                </View>
                {/* Col starts here */}

                {/* Col starts here */}
                <View style={[styles.orderDetailCol, { width: "50%" }]}>
                  <Text style={styles.detailTitle}>Comentarios</Text>
                  <View style={styles?.detailTextWrapper}>
                    <Text style={styles.detailText}>{data?.serviceNotes}</Text>
                  </View>
                </View>
                {/* Col starts here */}
                {/* Col starts here */}
                <View style={styles.actionWrapper}>
                  <View style={styles?.profileWrapper}>
                    <Image
                      source={{ uri: data?.tattooImage }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 100,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() =>
                      props?.editAgendaPopup(props?.edit_agenda_popup)
                    }
                  >
                    <Text style={styles.editBtnText}>Editar</Text>
                  </TouchableOpacity>
                </View>
                {/* Col starts here */}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  get_all_appiontments: state.main.get_all_appiontments,
  edit_agenda_popup: state.main.edit_agenda_popup,
});
export default connect(mapStateToProps, {
  editAgendaPopup,
  getAllAppiontments,
  deleteAppiontment,
})(ViewAgenda);

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
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { colorScheme } from "../../../../state-management/actions/Theme";
import { Feather } from "@expo/vector-icons";

const WorkerCard = (props) => {
  const [loading, setLoading] = useState(false);
  let color = props?.color_scheme;
  let data = props?.data?.data;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: props?.color_scheme?.bg,
      width: wp("23%"),
      height: hp("26%"),
      borderRadius: 10,
      backgroundColor: color?.bg,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignItems: "center",
      justifyContent: "space-evenly",
      marginRight: wp("2%"),
      marginBottom: hp("2%"),
    },
    loader: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    profileWrapper: {
      width: wp("7%"),
      height: wp("7%"),
      borderRadius: 100,
      overflow: "hidden",
    },
    title: {
      fontSize: rf(8),
      color: "#222",
      fontFamily: "IM",
      marginTop: 5,
    },
    label: {
      fontSize: rf(7),
      color: "#222",
      fontFamily: "IM",
      marginTop: 5,
    },
    btn: {
      width: "48%",
      height: hp("4%"),
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 5,
      backgroundColor: color?.buttonSecondary,
    },
    deleteBtn: {
      width: "48%",
      height: hp("4%"),
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 5,
      backgroundColor: "#f15049",
    },
    btnText: {
      fontSize: rf(7),
      fontFamily: "IM",
      color: color?.buttonText,
    },
    hr: {
      width: "90%",
      height: 1,
      backgroundColor: color?.bgBorder,
    },
    DataWrapper: {
      alignItems: "center",
      justifyContent: "center",
    },
    createIconWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    btnWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: wp("2%"),
    },
  });
  return (
    <TouchableOpacity style={styles.container} onPress={props?.onPress}>
      {props?.type == "create" && (
        <View style={styles.createIconWrapper}>
          <Feather
            name="plus-circle"
            size={hp("10%")}
            color={color?.buttonSecondary}
          />
        </View>
      )}
      {props?.type != "create" && (
        <>
          <View style={styles.profileWrapper}>
            <Image
              source={
                data?.profile
                  ? { uri: data?.profile }
                  : require("../../../../assets/logo.jpg")
              }
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={styles.DataWrapper}>
            <Text style={styles.title}>{data?.name}</Text>
            <Text style={styles.label}>{data?.selectedWorkerSkill}</Text>
          </View>
          <View style={styles.hr}></View>
          <View style={styles.btnWrapper}>
            <TouchableOpacity style={styles.btn} onPress={props?.onEditPress}>
              <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.deleteBtn,
                {
                  backgroundColor:
                    data?.accountStatus == "disabled"
                      ? color?.buttonPrimary
                      : "#f15049",
                },
              ]}
              onPress={props?.onDisablePress}
            >
              <Text style={styles.btnText}>
                {data?.accountStatus == "disabled" ? "Habilitar" : "Deshabilitar"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});
export default connect(mapStateToProps, { colorScheme })(WorkerCard);

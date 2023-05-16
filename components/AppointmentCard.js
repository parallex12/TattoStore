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

const AppiontmentCard = (props) => {
  let color = props?.color_scheme;
  let data = props?.data?.data;
  let id = props?.data?.id;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: color?.primaryBackground,
      height: hp("32%"),
      width: wp("18%"),
      borderTopLeftRadius: 15,
      borderBottomRightRadius: 15,
      marginHorizontal: wp("1%"),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      marginVertical: 10,
    },
    innerCont: {
      flex: 1,
      overflow: "hidden",
      borderTopLeftRadius: 15,
      borderBottomRightRadius: 15,
      paddingTop: 5,
    },
    cardContentWrapper: {
      flex: 1,
      padding: 10,
    },
    coverImageWrapper: {
      flex: 1,
      width: "100%",
    },
    title: {
      color: color?.text,
      fontSize: rf(8),
      fontFamily: "IB",
      paddingLeft: 5,
    },
    date: {
      color: color?.text,
      fontSize: rf(8),
      fontFamily: "IM",
      paddingLeft: 5,
      marginTop: 10,
    },
    time: {
      color: color?.text,
      fontSize: rf(6),
      fontFamily: "IM",
      paddingLeft: 5,
    },
    editarBtn: {
      width: wp("6%"),
      height: hp("2.5%"),
      borderRadius: 5,
      backgroundColor: color?.buttonSecondary,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 10,
      //   top:'1%'
    },
    editarBtnText: {
      color: color?.buttonText,
      fontSize: rf(6.5),
      fontFamily: "IM",
    },
    cardContentRowWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    profileWrapper: {
      width: wp("2.5%"),
      height: wp("2.5%"),
      borderRadius: 100,
      overflow: "hidden",
      marginTop: 10,
      right: 5,
    },
    divider: {
      width: "90%",
      height: 2,
      backgroundColor: color?.bgBorder,
      alignSelf: "center",
      marginTop: 5,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={props?.onPress}>
      <View style={styles.innerCont}>
        {/* card content starts here */}
        <View style={styles.cardContentWrapper}>
          <View style={styles.cardContentRowWrapper}>
            <View style={{ paddingHorizontal: 5, width: "60%" }}>
              <Text style={styles.title} numberOfLines={1}>
                {data?.category}
              </Text>
              <Text style={styles.date}>{data?.bookingDate}</Text>
              <Text style={styles.time}>
                {data?.bookingTiming?.selectedTime?.from +
                  " - " +
                  data?.bookingTiming?.selectedTime?.to}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity style={styles.editarBtn}>
                <Text style={styles.editarBtnText}>{data?.category}</Text>
              </TouchableOpacity>
              <View style={styles.profileWrapper}>
                <Image
                  source={require("../assets/profile.jpg")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider}></View>
          {/* Divider */}
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={[styles.title, { fontSize: rf(7) }]}>Cliente</Text>
            <Text style={[styles.title, { fontSize: rf(7) }]}>
              {data?.name}
            </Text>
          </View>
        </View>

        {/* card content ends here */}

        <View style={styles.coverImageWrapper}>
          <Image
            source={{ uri: data?.tattooImage }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});
export default connect(mapStateToProps, {})(AppiontmentCard);

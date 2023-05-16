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
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import CreateAgendaPopup from "./CreateAgendaPopup";
import { SignOut } from "../state-management/actions/auth/FirebaseAuthActions";
import AdminHeader from "./AdminHeader";
import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
  let color = props?.color_scheme;
  const [menuShow, setMenuShow] = useState(false);
  const navigation = useNavigation();

  let type = props?.type;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: color?.primaryBackground,
      height: hp("10%"),
      width: wp("100%"),
      paddingTop: StatusBar.currentHeight + hp("1%"),
      paddingBottom: hp("1%"),
      borderBottomWidth: 2,
      borderColor: color?.bgBorder,
      zIndex: 99,
    },
    headerBody: {
      flex: 1,
      flexDirection: "row",
      paddingHorizontal: wp("3%"),
      alignItems: "center",
      justifyContent: "space-between",
    },
    logoWrapper: {
      width: wp("3.5%"),
      height: "50%",
      backgroundColor: color?.buttonSecondary,
      borderRadius: 5,
    },
    profileWrapper: {
      width: wp("3.5%"),
      height: wp("3.5%"),
      backgroundColor: color?.buttonSecondary,
      borderRadius: 100,
      overflow: "hidden",
    },
    menu: {
      width: wp("26%"),
      minHeight: hp("10%"),
      backgroundColor: color?.primaryBackground,
      position: "absolute",
      top: hp("6.5%"),
      zIndex: 99999,
      right: wp("4%"),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: 5,
      paddingVertical: hp("1%"),
      paddingHorizontal: wp("1%"),
    },
    logoutText: {
      fontFamily: "IR",
      color: color?.buttonText,
      fontSize: rf(8),
    },
    logoutBtn: {
      width: wp("12%"),
      height: hp("5%"),
      borderRadius: 5,
      backgroundColor: "#BF5050",
      alignItems: "center",
      justifyContent: "center",
      marginTop: hp("2%"),
      alignSelf: "center",
    },
    switchWrapper: {
      width: "100%",
      height: hp("5%"),
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10,
      flexDirection: "row",
    },
    switchLabel: {
      fontSize: rf(8),
      color: color?.text,
      fontFamily: "IM",
    },
  });

  const onSwitchAccount = async () => {
    navigation?.navigate(type == "admin" ? "Dashboard" : "AdminDashboard");
    setMenuShow(false)
  };

  return (
    <>
      <View style={styles.container}>
        <CreateAgendaPopup />
        <View style={styles.headerBody}>
          <TouchableOpacity
            onPress={() =>
              props?.get_user_details?.role == "admin" && type == "admin"
                ? onSwitchAccount()
                : null
            }
            style={styles.logoWrapper}
          ></TouchableOpacity>
          {menuShow && (
            <View style={styles.menu}>
              {props?.get_user_details?.role == "admin" && type == "worker" ? (
                <TouchableOpacity
                  style={styles.switchWrapper}
                  onPress={onSwitchAccount}
                >
                  <Text style={styles.switchLabel}>Go to Admin Panel</Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => props?.SignOut()}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={styles.profileWrapper}
            onPress={() => setMenuShow(!menuShow)}
          >
            <Image
              source={require("../assets/profile.jpg")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  get_user_details: state.main.get_user_details,
});
export default connect(mapStateToProps, { SignOut })(Header);

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
  Switch,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { changeTheme, colorScheme } from "../state-management/actions/Theme";
import { createAgendaPopup } from "../state-management/actions/Features/Actions";

const SideMenu = (props) => {
  let color = props?.color_scheme;
  const [activeItem, setActiveItem] = useState("Inicio");
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: color?.primaryBackground,
      width: wp("16%"),
      paddingVertical: hp("2%"),
      paddingHorizontal: wp("1%"),
      borderRightWidth: 2,
      borderColor: color?.bgBorder,
    },
    menuItemWrapperActive: {
      width: "100%",
      height: hp("4.5%"),
      borderRadius: 7,
      backgroundColor: color?.buttonPrimary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: hp("1%"),
    },
    menuItemTextActive: {
      color: color?.buttonText,
      fontSize: rf(8),
      fontFamily: "IM",
    },
    menuItemWrapper: {
      width: "100%",
      height: hp("4.5%"),
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: hp("1%"),
    },
    menuItemText: {
      color: color?.text,
      fontSize: rf(8),
      fontFamily: "IM",
    },
    bottomButtonWrapper: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    bottomButton: {
      width: "100%",
      height: hp("4.5%"),
      borderRadius: 7,
      backgroundColor: color?.buttonPrimary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: hp("1%"),
    },
    bottomButtonText: {
      color: color?.buttonText,
      fontSize: rf(8),
      fontFamily: "IS",
    },
    switchWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: hp("1%"),
      width: "100%",
    },
    swicthText: {
      color: color?.text,
      fontSize: rf(8),
      fontFamily: "IS",
    },
  });

  const MenuItem = (res) => {
    return (
      <TouchableOpacity
        style={
          props?.active == res?.title
            ? styles.menuItemWrapperActive
            : styles.menuItemWrapper
        }
        onPress={res?.onPress}
      >
        <Text
          style={
            props?.active == res?.title
              ? styles.menuItemTextActive
              : styles.menuItemText
          }
        >
          {res?.title == "Dashboard" ? "Inicio" : res?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const onItemPress = (title) => {
    props?.navigation?.navigate(title);
  };

  const onChangeTheme = async () => {
    await props?.changeTheme();
    props?.colorScheme(setLoading);
  };

  return (
    <View style={styles.container}>
      <MenuItem title="Dashboard" onPress={() => onItemPress("Dashboard")} />
      <MenuItem title="Agenda" onPress={() => onItemPress("Agenda")} />
      <MenuItem title="Sesion" onPress={() => onItemPress("Sesion")} />
      <MenuItem title="Gestor" onPress={() => onItemPress("Gestor")} />
      <MenuItem title="Tiends" onPress={() => onItemPress("Tiends")} />
      <View style={styles.bottomButtonWrapper}>
        <View style={styles.switchWrapper}>
          <Text style={styles.swicthText}>Theme Mode</Text>
          <Switch
            trackColor={{
              false: color?.buttonPrimary,
              true: color?.buttonSecondary,
            }}
            thumbColor={isEnabled ? color?.buttonPrimary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            onChange={() => onChangeTheme()}
          />
        </View>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => props?.createAgendaPopup(props?.create_agenda_popup)}
        >
          <Text style={styles.bottomButtonText}>Crear Cita Nueva</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  create_agenda_popup: state.main.create_agenda_popup,
});
export default connect(mapStateToProps, {
  changeTheme,
  colorScheme,
  createAgendaPopup,
})(SideMenu);

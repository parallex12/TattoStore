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
  Modal,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { colorScheme } from "../../../../state-management/actions/Theme";

const CustomTextField = (props) => {
  let color = props?.color_scheme;

  const styles = StyleSheet.create({
    fieldWrapper: {
      width: "18%",
      height: hp("5%"),
      justifyContent: "flex-start",
      marginRight: wp("1%"),
      marginBottom: hp("5%"),
    },
    textField: {
      width: "100%",
      height: "100%",
      borderWidth: 0.5,
      borderColor: color?.bgBorder,
      borderRadius: 5,
      paddingHorizontal: "3%",
      color: color?.text,
      fontFamily: "IM",
      fontSize: rf(8),
    },
    label: {
      fontSize: rf(8),
      color: color?.text,
      fontFamily: "IS",
      bottom: 8,
    },
  });

  return (
    <View style={[styles.fieldWrapper, { ...props?.style }]}>
      <Text style={styles.label}>{props?.label}</Text>
      <TextInput
        defaultValue={props?.value}
        keyboardType={props?.keyboadType}
        autoCapitalize={false}
        style={styles.textField}
        onChangeText={(val) => props?.onChangeText(val, props?.name)}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});
export default connect(mapStateToProps, { colorScheme })(CustomTextField);

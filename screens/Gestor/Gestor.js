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
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
const Gestor = (props) => {
  let color = props?.color_scheme;

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
    block: {
      width: wp("84%"),
      height: hp("5%"),
      backgroundColor: color?.primaryBackground,
      borderBottomWidth: 2,
      borderColor: color?.bgBorder,
      paddingVertical: hp("1%"),
      alignItems: "center",
      justifyContent: "center",
      paddingRight: wp("5%"),
    },
    blockText: {
      fontSize: rf(8),
      fontFamily: "IB",
      color: color?.text,
    },
    btnWrapper: {
      flexDirection: "row",
      width: "100%",
      height: hp("10%"),
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: wp("2%"),
    },
    btn: {
      width: "22%",
      height: hp("4.1%"),
      borderRadius: 6,
      backgroundColor: color?.buttonPrimary,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal:'1%'
    },
    btnText: {
      fontSize: rf(8),
      color: color?.buttonText,
      fontFamily: "IS",
    },
  });

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header type="worker" />
      <View style={styles.body}>
        <SideMenu active="Gestor" navigation={props?.navigation} />
        <View style={styles.contentWrapper}>
          <ScrollView>
            <View style={styles.block}>
              <Text style={styles.blockText}>Gestor de cuentas de usuario</Text>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Ultimo tique</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Ultimo tique</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Ultimo tique</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Ultimo tique</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});
export default connect(mapStateToProps, {})(Gestor);

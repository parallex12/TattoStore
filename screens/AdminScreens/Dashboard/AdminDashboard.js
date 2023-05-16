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
} from "react-native";
import { connect } from "react-redux";
import { colorScheme } from "../../../state-management/actions/Theme";
import Header from "../../../components/Header";
import AdminSideMenu from "../../../components/AdminSideMenu";
import { getAuth } from "firebase/auth";
import AdminHeader from "../../../components/AdminHeader";

const AdminDashboard = (props) => {
  const [loading, setLoading] = useState(true);
  let color = props?.color_scheme;
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(user?.uid)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props?.color_scheme?.bg,
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
    contentWrapper: {
      width: wp("98%"),
    },
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header type="admin" />
      <View style={styles.body}>
        <AdminSideMenu active="AdminDashboard" navigation={props?.navigation} />
        <View style={styles.contentWrapper}>
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="black" />
            </View>
          )}
          <ScrollView>
            <View style={styles.block}>
              <Text style={styles.blockText}>Estudio</Text>
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
export default connect(mapStateToProps, { colorScheme })(AdminDashboard);

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
import { colorScheme } from "../../state-management/actions/Theme";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import AppointmentCard from "../../components/AppointmentCard";
import {
  getAllAppiontments,
  getAllWorkers,
} from "../../state-management/actions/Features/Actions";
import { getAuth } from "firebase/auth";
import { getUserDetails } from "../../state-management/actions/auth/FirebaseAuthActions";

const Dashboard = (props) => {
  const [loading, setLoading] = useState(true);
  const [appiontments, setAppiontments] = useState([]);
  let color = props?.color_scheme;
  const auth = getAuth();
  const user = auth.currentUser;
  let todayObject = new Date().toUTCString().split(" ");
  const today =
    todayObject[0] +
    " " +
    todayObject[1] +
    " " +
    todayObject[2] +
    " " +
    todayObject[3];
    
  let calendarData = [
    { day: "Lunes 2", month: "Enero" },
    { day: "Martes 12", month: "Enero" },
    { day: "Miercules 2", month: "Febrezo" },
    { day: "Lunes", month: "Marzo" },
    { day: "Martes 12", month: "Abril" },
    { day: "Miercules 2", month: "Mayo" },
    { day: "Lunes", month: "Enero" },
  ];
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
    block: {
      width: wp("84%"),
      height: hp("5%"),
      backgroundColor: color?.primaryBackground,
      borderBottomWidth: 2,
      borderColor: color?.bgBorder,
      paddingVertical: hp("1%"),
      alignItems: "flex-end",
      justifyContent: "center",
      paddingRight: wp("5%"),
    },
    blockText: {
      fontSize: rf(8),
      fontFamily: "IB",
      color: color?.text,
    },
    cardWrapper: {
      paddingHorizontal: wp("2%"),
      marginVertical: hp("1%"),
      flexDirection: "row",
      paddingRight: wp("17%"),
    },
    calendarWrapper: {
      width: "80%",
      minHeight: hp("35%"),
      backgroundColor: color?.primaryBackground,
      marginTop: hp("2%"),
      marginHorizontal: wp("3%"),
      marginBottom: hp("3%"),
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    contentWrapper: {
      width: wp("98%"),
    },
    calendarInnerWrapper: {
      flex: 1,
      overflow: "hidden",
      borderRadius: 10,
      paddingBottom: hp("2%"),
    },
    calendarHeader: {
      width: "100%",
      height: hp("6%"),
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderWidth: 1.5,
      borderColor: color?.bgBorder,
      borderTopWidth: 0,
      justifyContent: "center",
      paddingHorizontal: 10,
    },
    calendarHeaderTitle: {
      color: color?.text,
      fontSize: rf(7),
      fontFamily: "IR",
    },
    calendarRowWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
    },
    timeboxeActive: {
      width: wp("1.5%"),
      height: wp("1.5%"),
      backgroundColor: color?.buttonPrimary,
      marginHorizontal: 5,
    },
    timebox: {
      width: wp("1.5%"),
      height: wp("1.5%"),
      backgroundColor: color?.buttonSecondary,
      marginHorizontal: 5,
    },
    calendarRowTitle: {
      color: color?.text,
      fontSize: rf(7),
      fontFamily: "IM",
      marginHorizontal: 5,
      minWidth: "10%",
      textAlign: "left",
    },
  });
  useEffect(() => {
    props?.colorScheme(setLoading);
  }, []);

  useEffect(() => {
    setLoading(true);
    props?.getAllAppiontments(setLoading);
    props?.getUserDetails(user?.uid, setLoading);
    props?.getAllWorkers(setLoading);
  }, []);

  useEffect(() => {
    if (props?.get_all_appiontments != null) {
      setAppiontments(props?.get_all_appiontments);
    }
  }, [props]);

  if (loading) {
    return <ActivityIndicator size="large" color="black" />;
  }

  const TimeRow = (props) => {
    return (
      <View style={styles.calendarRowWrapper}>
        <Text style={styles.calendarRowTitle}>{props?.day}</Text>
        {new Array(15)?.map((item, index) => {
          return (
            <View
              key={index}
              style={item % 2 == 1 ? styles.timeboxeActive : styles.timebox}
            ></View>
          );
        })}
        <Text style={[styles.calendarRowTitle, { textAlign: "center" }]}>
          {props?.month}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header type="worker" />
      <View style={styles.body}>
        <SideMenu active="Dashboard" navigation={props?.navigation} />
        <View style={styles.contentWrapper}>
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="black" />
            </View>
          )}
          {!loading && (
            <ScrollView>
              <View style={styles.block}>
                <Text style={styles.blockText}>Hoy es {today}</Text>
              </View>
              {/* Appiontment Cards starts here */}
              <View style={styles.cardWrapper}>
                <ScrollView horizontal>
                  {appiontments?.map((item, index) => {
                    return (
                      <AppointmentCard
                        onPress={() =>
                          props?.navigation?.navigate("ViewAgenda", {
                            data: item,
                          })
                        }
                        key={index}
                        data={item}
                      />
                    );
                  })}
                </ScrollView>
              </View>
              <View style={styles.calendarWrapper}>
                <View style={styles.calendarInnerWrapper}>
                  <View style={styles.calendarHeader}>
                    <Text style={styles.calendarHeaderTitle}>
                      Disponibilidad
                    </Text>
                  </View>
                  {/* dates starts here */}
                  {calendarData?.map((item, index) => {
                    return (
                      <TimeRow
                        active={item?.active}
                        key={index}
                        day={item?.day}
                        month={item?.month}
                      />
                    );
                  })}
                  {/* dates starts here */}
                  <View></View>
                </View>
              </View>
              {/* Appiontment Cards ends here */}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  get_all_appiontments: state.main.get_all_appiontments,
  get_user_details: state.main.get_user_details,
});
export default connect(mapStateToProps, {
  colorScheme,
  getAllAppiontments,
  getUserDetails,
  getAllWorkers,
})(Dashboard);

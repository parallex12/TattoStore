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
  Image,
  Animated,
} from "react-native";
import { connect } from "react-redux";
import AppointmentCard from "../../../components/AppointmentCard";

const SessionPage = (props) => {
  let color = props?.color_scheme;
  const [loading, setLoading] = useState(false);
  const animeRef = useRef(new Animated.Value(-hp("80%"))).current;

  useEffect(() => {
    Animated.timing(animeRef, {
      toValue: props?.isSessionModalOpen ? hp("10%") : -hp("80%"),
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [props?.isSessionModalOpen]);

  let position = animeRef?.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
  });

  if (loading) {
    return (
      <View style={styles(color).loader}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const onSelectSession = () => {
    props?.setIsSessionModalOpen(!props?.isSessionModalOpen);
  };

  const onSelectAppionment = (item) => {
    props?.setIsSessionModalOpen(!props?.isSessionModalOpen);
    props?.setCurrentSession(item);
  };

  return (
    <>
      {props?.isSessionModalOpen && (
        <TouchableOpacity
          onPress={onSelectSession}
          style={styles(color).bgLayer}
        ></TouchableOpacity>
      )}
      <Animated.View
        style={[
          styles(color).container,
          {
            transform: [
              {
                translateY: position,
              },
            ],
          },
        ]}
      >
        <View style={styles(color)?.content}>
          <View style={styles(color)?.headerWrapper}>
            <Text style={styles(color).title}>Appiontments</Text>
            <View style={styles(color)?.searchWrapper}>
              <TextInput
                placeholder="search"
                style={styles(color)?.searchField}
                placeholderTextColor={color?.text}
              />
            </View>
          </View>
          {/* Appiontment Cards starts here */}
          <ScrollView>
            <View style={styles(color).cardWrapper}>
              {props?.get_all_appiontments?.map((item, index) => {
                if (item?.data?.status == "completed") return;
                return (
                  <AppointmentCard
                    onPress={() => onSelectAppionment(item)}
                    key={index}
                    data={item}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    </>
  );
};

const styles = (color) =>
  StyleSheet.create({
    container: {
      width: wp("100%"),
      height: hp("80%"),
      backgroundColor: color?.primaryBackground,
      position: "absolute",
      zIndex: 999999999,
      bottom: 0,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignSelf: "center",
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      padding: wp("1%"),
    },
    content: {
      flex: 1,
      paddingVertical: 10,
    },
    loader: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    bgLayer: {
      width: wp("100%"),
      height: hp("100%"),
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 999999,
    },
    cardWrapper: {
      marginVertical: hp("1%"),
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    headerWrapper: {
      width: "100%",
      height: hp("5%"),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: wp("1%"),
    },
    searchWrapper: {
      width: "80%",
      height: hp("4.5%"),
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      borderColor: "#e5e5e5",
    },
    searchField: {
      flex: 1,
      color: color?.text,
      fontSize: rf(8),
      fontFamily: "IR",
    },
    title: {
      color: color?.text,
      fontSize: rf(10),
      fontFamily: "IB",
      marginRight: wp("5%"),
    },
  });

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  get_all_appiontments: state.main.get_all_appiontments,
});

export default connect(mapStateToProps, {})(SessionPage);

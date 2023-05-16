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
  ScrollView,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { colorScheme } from "../../../state-management/actions/Theme";
import { useNavigation } from "@react-navigation/native";

const Table = (props) => {
  const [loading, setLoading] = useState(false);
  let color = props?.color_scheme;
  let data = props?.data;

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color?.secondaryBackground,
      minHeight: hp("10%"),
      marginHorizontal: wp("1%"),
      marginBottom: hp("3%"),
      maxHeight: hp("78%"),
      overflow: "hidden",
      paddingBottom: hp("1%"),
    },
    loader: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      backgroundColor: color?.buttonPrimary,
      height: hp("5%"),
      justifyContent: "space-between",
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    headerTitle: {
      color: color?.buttonText,
      fontSize: rf(8),
      fontFamily: "IS",
      flex: 1,
      textAlign: "center",
    },
    row: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      minHeight: hp("6%"),
      justifyContent: "center",
    },
    col: {
      flex: 1,
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      borderRightWidth: 2,
      height: "100%",
      borderColor: color?.bgBorder,
      paddingHorizontal: 10,
      borderTopWidth: 2,
    },
    colText: {
      color: color?.text,
      fontSize: rf(7),
      fontFamily: "IM",
      flexWrap: "wrap",
      textAlign: "center",
    },
    profile: {
      width: wp("2%"),
      height: wp("2%"),
      borderRadius: 100,
      marginRight: 5,
      overflow: "hidden",
      marginRight: 10,
    },
    cancelBtn: {
      width: "80%",
      height: hp("3%"),
      borderRadius: 5,
      backgroundColor: color?.buttonSecondary,
      alignItems: "center",
      justifyContent: "center",
    },
    cancelText: {
      color: color?.buttonText,
      fontSize: rf(7),
      fontFamily: "IS",
      textAlign: "center",
    },
  });

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const HeaderTitle = ({ title, style }) => {
    return <Text style={[styles.headerTitle, { ...style }]}>{title}</Text>;
  };
  const Row = (props) => {
    return <View style={styles.row}>{props?.children}</View>;
  };
  const Col = (props) => {
    return (
      <View style={[styles.col, { ...props?.style }]}>{props?.children}</View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {[
          "Fecha",
          "Nombre Client",
          "Comentario",
          "Fainza",
          "Canelaciones",
        ]?.map((item, index) => {
          let prepStyles = (a) => {
            return {
              flex: a == 1 ? 1.5 : 0.5,
            };
          };

          return (
            <HeaderTitle
              key={index}
              style={eval(index + 1) % 2 == 1 ? {} : prepStyles(index)}
              title={item}
            />
          );
        })}
      </View>
      <ScrollView>
        {data
          ?.filter((e) => {
            const valueArray = [e.data?.name?.toLowerCase()];
            try {
              if (
                props?.searchFields?.nombre != "" ||
                props?.searchFields?.fecha != "" ||
                props?.searchFields?.agente != ""
              ) {
                return (
                  e?.data?.name
                    ?.toLowerCase()
                    ?.includes(props?.searchFields?.nombre) &&
                  e?.data?.bookingDate
                    ?.toLowerCase()
                    ?.includes(props?.searchFields?.fecha) &&
                  e?.data?.phoneNumber
                    ?.toLowerCase()
                    ?.includes(props?.searchFields?.agente)
                );
              } else {
                return e;
              }
            } catch (e) {
              console.log(e.message);
            }
          })
          .map((item, index) => {
            return (
              <Row key={index}>
                <Col>
                  <Text style={styles.colText}>{item?.data?.bookingDate}</Text>
                </Col>
                <Col style={{ flex: 1.5 }}>
                  <View style={styles.profile}>
                    <Image
                      source={require("../../../assets/profile.jpg")}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </View>
                  <Text numberOfLines={1} style={styles.colText}>
                    {item?.data?.name + " " + item?.data?.surname}
                  </Text>
                </Col>
                <Col>
                  <Text style={styles.colText}>{item?.data?.serviceNotes}</Text>
                </Col>
                <Col style={{ flex: 0.5 }}>
                  <Text style={styles.colText}>
                    {parseInt(
                      item?.data?.paymentPrice + item?.data?.servicePrice
                    )}
                    €
                  </Text>
                </Col>
                <Col>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => props?.onDeleteAppiontment(item?.id)}
                  >
                    <Text style={styles.cancelText}>Cancelar Cita</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
            );
          })}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});
export default connect(mapStateToProps, {
  colorScheme,
})(Table);

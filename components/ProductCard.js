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
} from "react-native";
import { connect } from "react-redux";

const ProductCard = (props) => {
  let color = props?.color_scheme;
  let data=props?.data?.data

  const [loading, setLoading] = useState(false);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color?.secondaryBackground,
      width: "32%",
      height: hp("25%"),
      borderRadius: 8,
      padding: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom: hp("1.5%"),
        marginRight: "1%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical:10
    },
    productImageWrapper: {
      flex: 1,
      borderRadius: 8,
      overflow: "hidden",
    },
    productContentWrapper: {
      flex: 1.2,
      alignItems: "center",
      justifyContent: "space-between",
    },
    productDetailsCont: {
      flex: 1,
      padding: 8,
      //   alignItems:'center'
    },
    productTitle: {
      fontSize: rf(8),
      fontFamily: "IS",
      color: color?.text,
      marginBottom: 5,
    },
    productQuantity: {
      fontSize: rf(7),
      fontFamily: "IM",
      color: color?.text,
      marginVertical: 5,
    },
    productPrice: {
      fontSize: rf(10),
      fontFamily: "IB",
      color: color?.buttonPrimary,
      textAlign: "center",
      top: "5%",
    },
    editBtn: {
      width: "80%",
      height: hp("4%"),
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color?.buttonSecondary,
      marginBottom:5
    },
    deleteBtn: {
      width: "80%",
      height: hp("4%"),
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#f15049',
      marginBottom:5
    },
    editBtnText: {
      fontSize: rf(7),
      fontFamily: "IR",
      color: color?.buttonText,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.productImageWrapper}>
        <Image
          source={{uri:data?.productImage}}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.productContentWrapper}>
        <View style={styles.productDetailsCont}>
          <Text style={styles.productTitle}>{data?.Product}</Text>
          <Text style={styles.productQuantity}>({data?.quantity} unidades restantes)</Text>
          <Text style={styles.productPrice}>{data?.sellPrice}€</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={props?.onEditPress}>
          <Text style={styles.editBtnText}>EDITAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={props?.onDeletePress}>
          <Text style={styles.editBtnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});
export default connect(mapStateToProps, {})(ProductCard);

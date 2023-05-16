import React, { useEffect, useState, useRef, useMemo } from "react";
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
import { AntDesign } from "@expo/vector-icons";

const Checkout = (props) => {
  let color = props?.color_scheme;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const checkoutAnimeRef = useRef(new Animated.Value(wp("0%"))).current;

  let totalSumArr = [];

  useEffect(() => {
    (async () => {
      await Animated.timing(checkoutAnimeRef, {
        toValue: props?.isCheckout != "open" ? wp("25%") : wp("0%"),
        duration: props?.isCheckout == false ? 0 : 500,
        useNativeDriver: true,
      }).start();
    })();
  }, [props?.isCheckout]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: color?.secondaryBackground,
      width: wp("25%"),
      height: hp("100%"),
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
      position: "absolute",
      right: 0,
      zIndex: 999999,
    },
    closeBtn: {
      width: hp("4%"),
      height: hp("4%"),
      backgroundColor: color?.buttonSecondary,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: rf(15),
      color: color?.text,
      fontFamily: "IB",
      marginVertical: hp("1%"),
      textAlign: "center",
    },
    checkoutItemWrapper: {
      // flex: 1,
      marginVertical: hp("2%"),
    },
    checkoutItem: {
      width: "100%",
      height: hp("10%"),
      borderTopWidth: 1,
      borderBottomWidth: 1,
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingHorizontal: 10,
    },
    checkoutItemRow: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    checkoutItemPrice: {
      fontSize: rf(9),
      color: color?.text,
      fontFamily: "IB",
    },
    checkoutItemTitle: {
      fontSize: rf(8.45),
      color: color?.text,
      fontFamily: "IB",
      flex: 1,
    },
    deleteBtnCheckOut: {
      flex: 0.4,
      alignItems: "center",
    },
    pqcWrapper: {
      width: "30%",
      height: hp("3%"),
      borderRadius: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    pqcTrigger: {
      width: "33%",
      height: hp("3%"),
      borderWidth: 1,
      borderTopLeftRadius: 100,
      borderBottomLeftRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      borderColor:color?.text
    },
    pqcQuanity: {
      width: "33%",
      height: hp("3%"),
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      borderColor:color?.text
    },
    pqcTrigger2: {
      width: "33%",
      height: hp("3%"),
      borderWidth: 1,
      borderTopRightRadius: 100,
      borderBottomRightRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      borderColor:color?.text
    },
    totalWrapper: {
      flex: 1,
      alignItems: "flex-end",
      marginVertical: hp("2%"),
    },
    totalText: {
      fontSize: rf(11),
      color: color?.text,
      fontFamily: "IB",
    },
    content: {
      maxHeight: "60%",
    },
    actionsWrapper: {
      width: "100%",
      bottom: wp("10%"),
      alignItems: "center",
      justifyContent: "center",
    },
    actionsBtn: {
      width: "90%",
      height: hp("5%"),
      backgroundColor: color?.buttonSecondary,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: wp("0.5%"),
    },
    actionsBtn2: {
      width: "90%",
      height: hp("5%"),
      backgroundColor: color?.text,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: wp("0.5%"),
    },
    actionsBtnText: {
      fontSize: rf(7),
      color: color?.buttonText,
      fontFamily: "IM",
    },
  });

  const ProductQuanityCounter = ({ item }) => {
    let quantity = item?.quantity || 1;
    return (
      <View style={styles.pqcWrapper}>
        <TouchableOpacity
          style={styles.pqcTrigger}
          onPress={() => quantity > 1 && CounterTrigers(quantity - 1, item)}
        >
          <AntDesign name="minus" size={hp("2%")} color={color?.text} />
        </TouchableOpacity>
        <View style={styles.pqcQuanity}>
          <Text style={{color:color?.text}}>{quantity}</Text>
        </View>
        <TouchableOpacity
          style={styles.pqcTrigger2}
          onPress={() => CounterTrigers(quantity + 1, item)}
        >
          <AntDesign name="plus" size={hp("2%")} color={color?.text} />
        </TouchableOpacity>
      </View>
    );
  };

  const CheckoutItem = ({ data, onDeltePress }) => {
    return (
      <View style={styles.checkoutItem}>
        <View style={styles.checkoutItemRow}>
          <Text style={styles.checkoutItemTitle}>{data?.data?.Product}</Text>
          <TouchableOpacity
            style={styles.deleteBtnCheckOut}
            onPress={onDeltePress}
          >
            <AntDesign name="delete" size={rf(12)} color={color?.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.checkoutItemRow}>
          <Text style={styles.checkoutItemPrice}>
            {data?.quantity * data?.data?.sellPrice}€
          </Text>
          <ProductQuanityCounter item={data} />
        </View>
      </View>
    );
  };

  const onRemoveItem = async (item) => {
    const index = props?.cartDetails.indexOf(item);
    let newArr = [...props?.cartDetails];
    newArr[index]["quantity"] = 1;
    const x = newArr.splice(index, 1);
    props?.setCartDetails(newArr);
  };

  const CounterTrigers = (val, item) => {
    try {
      const index = props?.cartDetails.indexOf(item);
      let newArr = [...props?.cartDetails];
      newArr[index]["quantity"] = val;
      newArr[index]["total"] = newArr[index]?.data?.sellPrice * val;
      props?.setCartDetails(newArr);
    } catch (e) {
      console.log(e.message);
    }
  };

  let memoizeItems = useMemo(() => {
    return props?.cartDetails;
  }, [props?.cartDetails]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: checkoutAnimeRef }] },
      ]}
      ref={checkoutAnimeRef}
    >
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => props?.setIsCheckout("close")}
      >
        <AntDesign name="close" size={rf(10)} color={color?.buttonText} />
      </TouchableOpacity>
      <Text style={styles.title}>CHECKOUT</Text>
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.checkoutItemWrapper}>
            {memoizeItems?.map((item, index) => {
              if (!item?.quantity) {
                item["total"] = item?.data?.sellPrice * 1;
                item["quantity"] = 1;
              }
              return (
                <CheckoutItem
                  data={item}
                  onDeltePress={() => onRemoveItem(item)}
                  key={index}
                  index={index}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.totalWrapper}>
        <Text style={styles.totalText}>
          Total :
          {props?.cartDetails?.map((item, index) => {
            totalSumArr.push(item?.total);
            return (
              index == props?.cartDetails?.length - 1 &&
              totalSumArr.reduce((a, b) => a + b, 0)
            );
          })}
          €
        </Text>
      </View>
      <View style={styles.actionsWrapper}>
        <TouchableOpacity style={styles.actionsBtn}>
          <Text style={styles.actionsBtnText}>IMPRIMIR TIQUET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionsBtn2}
          onPress={() => props?.onConfirmPress()}
        >
          {props?.checkOutLoading ? (
            <ActivityIndicator size="small" color={color?.buttonText} />
          ) : (
            <Text style={styles.actionsBtnText}>CONFIRMAR COMPRA</Text>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});
export default connect(mapStateToProps, {})(Checkout);

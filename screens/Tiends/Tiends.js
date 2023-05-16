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
import ProductCard from "./components/ProductCard";
import { getAllProducts } from "../../state-management/actions/Features/Actions";
import { updateProduct } from "../../state-management/actions/Features/Actions";
import SideMenu from "../../components/SideMenu";
import Checkout from "./components/Checkout";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Tiends = (props) => {
  let color = props?.color_scheme;

  const [loading, setLoading] = useState(true);
  const [useLoading, setUseLoading] = useState([]);
  const [checkOutLoading, setCheckOutLoading] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [cartDetails, setCartDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [createPopupVisible, setCreatePopupVisible] = useState(false);

  const wrapperAnimedValues = useSharedValue({ width: wp("80%") });
  const cardAnimedValues = useSharedValue({ height: hp("25%") });

  const animationStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(wrapperAnimedValues.value.width, { duration: 500 }),
    };
  });
  const animationStyle2 = useAnimatedStyle(() => {
    return {
      height: withTiming(cardAnimedValues.value.height, { duration: 500 }),
    };
  });

  useEffect(() => {
    props?.getAllProducts(setLoading);
  }, []);

  useEffect(() => {
    if (props?.get_all_products != null) {
      setProducts(props?.get_all_products);
    }
  }, [props?.get_all_products]);

  useEffect(() => {
    try {
      (async () => {
        if (isCheckout == false || !cardAnimedValues) return null;
        if (isCheckout == "open") {
          wrapperAnimedValues.value = { width: wp("60%") };
          cardAnimedValues.value = { height: hp("22%") };
        } else {
          wrapperAnimedValues.value = { width: wp("80%") };
          cardAnimedValues.value = { height: hp("25%") };
        }
      })();
    } catch (e) {
      console.log(e.message);
    }
  }, [isCheckout]);

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
    cardsWrapper: {
      flex: 1,
      flexDirection: "row",
      padding: 10,
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    actionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      marginVertical: hp("1%"),
    },
    pageTitle: {
      fontSize: rf(10),
      fontFamily: "IS",
      color: color?.text,
    },
    createBtn: {
      width: wp("14%"),
      height: hp("4.5%"),
      borderRadius: 100,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      borderColor: color?.text,
    },
    createBtnText: {
      fontSize: rf(7),
      fontFamily: "IS",
      color: color?.text,
    },
  });

  const onUsePress = (item) => {
    let data = {
      quantity: parseInt(item?.data?.quantity - 1),
    };
    let prev = cartDetails?.filter((e) => {
      return e?.id == item?.id;
    });
    if (prev?.length > 0) {
      return null;
    }
    setCartDetails((prev) => {
      return [...prev, item];
    });
  };
  const onPlaceOrder = async () => {
    try {
      setCheckOutLoading(true);
      await Promise.all(
        cartDetails?.map(async (item, index) => {
          let data = {
            quantity: parseInt(item?.data?.quantity - item?.quantity),
          };
          await props?.updateProduct(
            data,
            item?.id,
            index == cartDetails?.length - 1 ? setCheckOutLoading : () => {}
          );
        })
      );
      setCartDetails([]);
      setIsCheckout("close");
      alert("Successfull")
    } catch (e) {
      alert("Something Went Wrong!");
      console.log(e.message);
    }
  };
  return (
    <View style={styles.container}>
      <Header type="worker" />
      <View style={styles.body}>
        <Checkout
          cartDetails={cartDetails}
          setCartDetails={setCartDetails}
          isCheckout={isCheckout}
          setIsCheckout={setIsCheckout}
          onConfirmPress={onPlaceOrder}
          checkOutLoading={checkOutLoading}
        />

        <SideMenu active="Tiends" navigation={props?.navigation} />
        <View style={styles.contentWrapper}>
          <View style={styles.actionRow}>
            <Text style={styles.pageTitle}>Lista de Productos</Text>
          </View>
          {loading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : (
            <ScrollView>
              <Animated.View style={[styles.cardsWrapper, animationStyle]}>
                {products?.map((item, index) => {
                  return (
                    <ProductCard
                      setIsCheckout={setIsCheckout}
                      key={index}
                      data={item}
                      onUsePress={() => {
                        setIsCheckout("open");
                        onUsePress(item);
                      }}
                      size={animationStyle2}
                      useLoading={checkOutLoading}
                    />
                  );
                })}
              </Animated.View>
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
  get_all_products: state.main.get_all_products,
});
export default connect(mapStateToProps, { getAllProducts, updateProduct })(
  Tiends
);

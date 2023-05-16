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
  Alert,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import Header from "../../../components/Header";
import AdminSideMenu from "../../../components/AdminSideMenu";
import ProductCard from "../../../components/ProductCard";
import CreateProductPopup from "./components/CreateProductPopup";
import { getAllProducts } from "../../../state-management/actions/Features/Actions";
import EditProductPopup from "./components/EditProductPopup";
import { deleteProduct } from "../../../state-management/actions/Features/Actions";
const AdminTiends = (props) => {
  let color = props?.color_scheme;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [createPopupVisible, setCreatePopupVisible] = useState(false);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [currentEditedProduct, setCurrentEditedProduct] = useState(null);

  useEffect(() => {
    props?.getAllProducts(setLoading);
  }, []);

  useEffect(() => {
    if (props?.get_all_products != null) {
      setProducts(props?.get_all_products);
    }
  }, [props?.get_all_products]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props?.getAllProducts(setRefreshing);
  }, []);

  const onDeleteProduct = (item) => {
    Alert.alert(
      "Advertencia",
      "Está seguro de que desea eliminar este producto?",
      [
        {
          text: "Si",
          onPress: () => {
            setLoading(true);
            props?.deleteProduct(item?.id, setLoading);
            onRefresh();
          },
        },
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

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

  return (
    <View style={styles.container}>
      <Header type="admin" />
      <View style={styles.body}>
        <AdminSideMenu active="AdminTiends" navigation={props?.navigation} />
        {createPopupVisible && (
          <CreateProductPopup
            createPopupVisible={createPopupVisible}
            setCreatePopupVisible={setCreatePopupVisible}
          />
        )}
        {editPopupVisible && (
          <EditProductPopup
            data={currentEditedProduct}
            createPopupVisible={editPopupVisible}
            setCreatePopupVisible={setEditPopupVisible}
          />
        )}
        <View style={styles.contentWrapper}>
          <View style={styles.actionRow}>
            <Text style={styles.pageTitle}>Lista de Productos</Text>
            <TouchableOpacity
              style={styles.createBtn}
              onPress={() => setCreatePopupVisible(true)}
            >
              <Text style={styles.createBtnText}>CREAR PRODUCTO</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl
                  tintColor={color?.buttonPrimary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            >
              <View style={styles.cardsWrapper}>
                {products?.map((item, index) => {
                  return (
                    <ProductCard
                      onEditPress={() => {
                        setEditPopupVisible(true);
                        setCurrentEditedProduct(item);
                      }}
                      onDeletePress={() => onDeleteProduct(item)}
                      key={index}
                      data={item}
                    />
                  );
                })}
              </View>
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
export default connect(mapStateToProps, { getAllProducts, deleteProduct })(
  AdminTiends
);

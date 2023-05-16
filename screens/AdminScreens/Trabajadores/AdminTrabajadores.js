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
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { colorScheme } from "../../../state-management/actions/Theme";
import Header from "../../../components/Header";
import AdminSideMenu from "../../../components/AdminSideMenu";
import WorkerCard from "./components/WorkerCard";
import CreateWrokerPopup from "./components/CreateWrokerPopup";
import { getAllWorkers } from "../../../state-management/actions/Features/Actions";
import EditWorkerPopup from "./components/EditWorkerPopup";
import { disableWorkerAccount } from "../../../state-management/actions/Features/Actions";
import { RefreshControl } from "react-native-gesture-handler";

const AdminTrabajadores = (props) => {
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [createPopupVisible, setCreatePopupVisible] = useState(false);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [currentEditedWorker, setCurrentEditedWorker] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  let color = props?.color_scheme;

  useEffect(() => {
    props?.getAllWorkers(setLoading);
  }, []);

  useEffect(() => {
    if (props?.get_all_workers != null) {
      setWorkers(props?.get_all_workers);
    }
  }, [props?.get_all_workers]);

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
    cardsWrapper: {
      flexDirection: "row",
      paddingHorizontal: wp("2%"),
      marginTop: hp("2%"),
      alignItems: "center",
      justifyContent: "flex-start",
      width: "85%",
      flexWrap: "wrap",
    },
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const onDisable = (item) => {
    Alert.alert(
      "Advertencia",
      `Estás seguro que quieres ${
        item?.data?.accountStatus == "disabled" ? "deshabilitar" : "Habilitar"
      } Este trabajador?`,
      [
        {
          text: "Si",
          onPress: async () => {
            setLoading(true);
            await props?.disableWorkerAccount(
              item?.id,
              item?.data?.accountStatus,
              setLoading
            );
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props?.getAllWorkers(setRefreshing);
  }, []);

  return (
    <View style={styles.container}>
      <Header type="admin" />
      {createPopupVisible && (
        <CreateWrokerPopup
          setCreatePopupVisible={setCreatePopupVisible}
          createPopupVisible={createPopupVisible}
        />
      )}
      {editPopupVisible && (
        <EditWorkerPopup
          data={currentEditedWorker}
          setCreatePopupVisible={setEditPopupVisible}
          createPopupVisible={editPopupVisible}
        />
      )}
      <View style={styles.body}>
        <AdminSideMenu
          active="AdminTrabajadores"
          navigation={props?.navigation}
        />
        <View style={styles.contentWrapper}>
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
              keyboardShouldPersistTaps="always"
            >
              <View style={styles.block}>
                <Text style={styles.blockText}>Trabajadores</Text>
              </View>
              <View style={styles.cardsWrapper}>
                <WorkerCard
                  type="create"
                  onPress={() => setCreatePopupVisible(true)}
                />
                {workers?.map((item, index) => {
                  return (
                    <WorkerCard
                      onEditPress={() => {
                        setEditPopupVisible(true);
                        setCurrentEditedWorker(item);
                      }}
                      onDisablePress={() => onDisable(item)}
                      data={item}
                      key={index}
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
  get_all_workers: state.main.get_all_workers,
});
export default connect(mapStateToProps, {
  colorScheme,
  disableWorkerAccount,
  getAllWorkers,
})(AdminTrabajadores);

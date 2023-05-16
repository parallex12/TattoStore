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
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { colorScheme } from "../../state-management/actions/Theme";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import AppointmentCard from "../../components/AppointmentCard";
import Table from "./components/Table";
import {
  deleteAppiontment,
  getAllAppiontments,
} from "../../state-management/actions/Features/Actions";

const Agenda = (props) => {
  let color = props?.color_scheme;
  const [appiontments, setAppiontments] = useState([]);
  const [searchFields, setSearchFields] = useState({
    fecha: "",
    nombre: "",
    agente: "",
  });

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
    filterFieldsWrapper: {
      width: "100%",
      alignItems: "center",
      paddingHorizontal: wp("3%"),
      flexDirection: "row",
      marginVertical: hp("2%"),
    },
    filterField: {
      width: "26%",
      height: hp("5%"),
      borderRadius: 10,
      padding: 5,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderColor: color?.bgBorder,
      alignItems: "flex-start",
      justifyContent: "center",
      marginRight: wp("2%"),
    },
    textField: {
      width: "100%",
      fontSize: rf(7),
      color: color?.text,
      fontFamily: "IM",
    },
  });

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  let memoizeAppionments = useMemo(() => {
    return props?.get_all_appiontments;
  }, [props?.get_all_appiontments]);

  const onDeleteAppiontment = (id) => {
    Alert.alert(
      "Warning",
      "Are you sure you want to delete this appiontment?",
      [
        {
          text: "Yes",
          onPress: async () => {
            await props?.deleteAppiontment(id, props?.navigation, setLoading);
            props?.getAllAppiontments(setLoading);
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

  return (
    <View style={styles.container}>
      <Header type="worker" />
      <View style={styles.body}>
        <SideMenu active="Agenda" navigation={props?.navigation} />
        <View style={styles.contentWrapper}>
          <ScrollView>
            {/* Filter Fields starts here */}
            <View style={styles.filterFieldsWrapper}>
              <View style={styles.filterField}>
                <TextInput
                  onChangeText={(val) =>
                    setSearchFields((prev) => ({
                      ...prev,
                      fecha: val?.toLowerCase(),
                    }))
                  }
                  style={styles.textField}
                  placeholder="Fecga"
                  placeholderTextColor={color?.text}
                />
              </View>
              <View style={styles.filterField}>
                <TextInput
                  onChangeText={(val) =>
                    setSearchFields((prev) => ({
                      ...prev,
                      nombre: val?.toLowerCase(),
                    }))
                  }
                  style={styles.textField}
                  placeholder="Buscar Nombre o Tfn.."
                  placeholderTextColor={color?.text}
                />
              </View>
              <View style={styles.filterField}>
                <TextInput
                  onChangeText={(val) =>
                    setSearchFields((prev) => ({
                      ...prev,
                      agente: val?.toLowerCase(),
                    }))
                  }
                  style={styles.textField}
                  placeholder="Agente"
                  placeholderTextColor={color?.text}
                />
              </View>
            </View>
            {/* Filter Fields starts here */}

            <Table
              data={memoizeAppionments}
              setLoading={setLoading}
              searchFields={searchFields}
              onDeleteAppiontment={onDeleteAppiontment}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  get_all_appiontments: state.main.get_all_appiontments,
});
export default connect(mapStateToProps, {
  deleteAppiontment,
  getAllAppiontments,
})(Agenda);

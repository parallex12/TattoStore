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
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { createClient } from "../../state-management/actions/Features/Actions";
import { useMemo } from "react";
const ClientDetailsForm = (props) => {
  let color = props?.color_scheme;
  const [focusedField, setFocusedField] = useState("");
  const [searchClientFilter, setSearchClientFilter] = useState(false);
  const [name, setName] = useState(null);
  const [searchClientText, setSearchClientText] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    clientDetailsFormWrapper: {
      width: "100%",
      marginTop: hp("1%"),
      zIndex: 9999,
    },
    textFieldWrapper: {
      width: "100%",
      borderBottomWidth: 0.5,
      height: hp("3.2%"),
      paddingHorizontal: 5,
      marginVertical: hp("0.8%"),
      borderColor: color.text,
      zIndex: 0,
    },
    textField: {
      color: color?.text,
      fontSize: rf(5.5),
      height: "100%",
      fontFamily: "IR",
    },
    partLabel: {
      color: color?.buttonPrimary,
      fontSize: rf(6.5),
      fontFamily: "IR",
      height: hp("2.5%"),
      marginVertical: hp("0.8%"),
      borderBottomWidth: 0.5,
      borderColor: color.buttonPrimary,
    },
    partLabel2: {
      color: color?.buttonPrimary,
      fontSize: rf(6.5),
      fontFamily: "IR",
      height: hp("3.2%"),
      marginVertical: hp("0.8%"),
      borderBottomWidth: 0.5,
      borderColor: color.buttonPrimary,
      width: "55%",
    },
    rowFieldWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 0,
    },
    actionWrapper: {
      width: "45%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 0.5,
      height: hp("3.2%"),
      paddingHorizontal: 5,
      marginVertical: hp("0.8%"),
      borderColor: color.buttonPrimary,
    },
    newClientBtn: {
      width: "50%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    newClientBtnText: {
      color: color?.text,
      fontSize: rf(5.5),
      fontFamily: "IR",
    },
    clientFilterWrapper: {
      borderRadius: 5,
      width: wp("20%"),
      minHeight: hp("8%"),
      maxHeight: hp("27%"),
      backgroundColor: color?.bg,
      position: "absolute",
      top: hp("4.3%"),
      right: 0,
      zIndex: 9999,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    clientWrapper: {
      width: "100%",
      flexDirection: "row",
      height: hp("5%"),
      paddingVertical: hp("1%"),
      borderTopWidth: 0.5,
      borderColor: "#e5e5e5",
      alignItems: "center",
      justifyContent: "space-between",
    },
    clientNameText: {
      fontSize: rf(7),
      color: color?.text,
      fontFamily: "IB",
      marginBottom: 3,
    },

    clientSmallDetailText: {
      fontSize: rf(5),
      color: color?.text,
      fontFamily: "IM",
    },
    clientInnerWrapper: {
      alignItems: "flex-start",
      flex: 1,
    },
    searchBarWrapper: {
      width: "100%",
      height: hp("4%"),
      backgroundColor: color?.bg,
      borderRadius: 5,
      borderWidth: 0.5,
      paddingHorizontal: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 5,
      borderColor:color?.text
    },
    searchTextInput: {
      fontSize: rf(5),
      color: color?.text,
      fontFamily: "IM",
      flex: 1,
      height: "100%",
    },
  });

  const TextField = (res) => {
    return (
      <View style={[styles.textFieldWrapper, { ...res.style }]}>
        <TextInput
          placeholder={res.placeholder}
          style={styles.textField}
          placeholderTextColor={color?.text}
          onChangeText={(val) => setName(val)}
        />
      </View>
    );
  };

  const onCreateClient = () => {
    let data = {
      name: props?.formData?.name,
      surname: props?.formData?.surname,
      email: props?.formData?.email,
      phoneNumber: props?.formData?.phoneNumber,
    };
    setLoading(true);
    props?.createClient(data, setLoading);
  };

  const onSearchClient = () => {
    setSearchClientFilter(!searchClientFilter);
  };

  const onSelectClient = (item) => {
    props?.setFormData((prev) => ({
      ...prev,
      email: item?.data?.email,
      name: item?.data?.name,
      surname: item?.data?.surname,
      phoneNumber: item?.data?.phoneNumber,
      clientSelected: item,
    }));
    setSearchClientFilter(!searchClientFilter);
    setSearchClientText("");
  };

  return (
    <View style={styles.clientDetailsFormWrapper}>
      {/* Filter */}
      {searchClientFilter && (
        <View style={styles.clientFilterWrapper}>
          {/* //Search Bar */}
          <View style={styles.searchBarWrapper}>
            <TextInput
              style={styles.searchTextInput}
              placeholder="Search"
              placeholderTextColor={color?.text}
              onChangeText={(val) => setSearchClientText(val?.toLowerCase())}
            />
            <AntDesign name="search1" size={rf(10)} color={color?.text} />
          </View>
          <ScrollView>
            {props?.memoizeClients
              ?.filter((e) => {
                return e?.data?.name?.toLowerCase()?.includes(searchClientText);
              })
              .map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.clientWrapper,
                      { borderTopWidth: index == 0 ? 0 : 0.5 },
                    ]}
                    onPress={() => onSelectClient(item)}
                  >
                    <View style={styles.clientInnerWrapper}>
                      <Text style={styles?.clientNameText}>
                        {item?.data?.name || "No Name"}
                      </Text>
                      <Text style={styles?.clientSmallDetailText}>
                        {item?.data?.phoneNumber || "No Phone"}
                      </Text>
                    </View>
                    <Text style={styles?.clientSmallDetailText}>
                      {item?.data?.email || "No Email"}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      )}
      <View style={styles?.rowFieldWrapper}>
        {/* <TextField placeholder="Cliente" style={{ width: "55%" }} /> */}
        <Text style={styles.partLabel2}>Cliente</Text>
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.newClientBtn}
            onPress={onCreateClient}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#222" />
            ) : (
              <Text style={styles.newClientBtnText}>+Nuevo</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.newClientBtn}
            onPress={onSearchClient}
          >
            <AntDesign name="search1" size={rf(5.5)} color={color.text} />
            <Text style={styles.newClientBtnText}> Encontrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles?.rowFieldWrapper}>
        <View style={[styles.textFieldWrapper, { width: "48%" }]}>
          <TextInput
            placeholder={"Nombre"}
            style={styles.textField}
            placeholderTextColor={color?.text}
            onChangeText={(val) =>
              props?.setFormData((prev) => ({ ...prev, name: val }))
            }
            value={props?.formData?.name}
          />
        </View>
        <View style={[styles.textFieldWrapper, { zIndex: -87, width: "48%" }]}>
          <TextInput
            placeholder="Apellidos"
            style={styles.textField}
            placeholderTextColor={color?.text}
            onChangeText={(val) =>
              props?.setFormData((prev) => ({ ...prev, surname: val }))
            }
            value={props?.formData?.surname}
          />
        </View>
      </View>
      <View style={styles.textFieldWrapper}>
        <TextInput
          placeholder="Dirección de correo electrónico "
          style={styles.textField}
          placeholderTextColor={color?.text}
          onChangeText={(val) =>
            props?.setFormData((prev) => ({ ...prev, email: val }))
          }
          value={props?.formData?.email}
        />
      </View>
      <View style={styles.textFieldWrapper}>
        <TextInput
          style={styles.textField}
          placeholderTextColor={color?.text}
          onChangeText={(val) =>
            props?.setFormData((prev) => ({ ...prev, phoneNumber: val }))
          }
          value={props?.formData?.phoneNumber}
          placeholder="Nº de Teléfono "
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.textFieldWrapper}>
        <TextInput
          style={styles.textField}
          placeholderTextColor={color?.text}
          onChangeText={(val) =>
            props?.setFormData((prev) => ({ ...prev, budget: val }))
          }
          placeholder="Presupuesto "
          value={props?.formData?.budget}
        />
      </View>
      <View style={styles.textFieldWrapper}>
        <TextInput
          style={styles.textField}
          placeholderTextColor={color?.text}
          onChangeText={(val) =>
            props?.setFormData((prev) => ({ ...prev, serviceNotes: val }))
          }
          placeholder="Notas sobre el servicio"
          value={props?.formData?.serviceNotes}
        />
      </View>

      <Text style={styles.partLabel}>Información de Pago de la reserva</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  get_all_clients: state.main.get_all_clients,
});
export default connect(mapStateToProps, { createClient })(ClientDetailsForm);

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
  Switch,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { changeTheme, colorScheme } from "../../state-management/actions/Theme";
import Checkbox from "expo-checkbox";
import { EvilIcons, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import SelectTime from "./SelectTime";
import ClientDetailsForm from "./ClientDetailsForm";
import DropDown from "./DropDown";
import { categories } from "./CategoriesData";

const FormLeft = (props) => {
  let color = props?.color_scheme;
  const [isChecked, setChecked] = useState(false);

  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    formLeft: {
      flex: 1.2,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingRight: wp("1%"),
    },
    formFieldStyle1: {
      width: "100%",
      height: hp("4.3%"),
      paddingVertical: 5,
      marginBottom: hp("1.5%"),
      flexDirection: "row",
      alignItems: "center",
      zIndex: 99999999999999,
    },
    formFieldStyle1Text: {
      color: color?.text,
      fontSize: rf(6),
      fontFamily: "IR",
      marginLeft: "5%",
    },
    formFieldStyle2Wrapper: {
      width: "100%",
      paddingVertical: 5,
    },
    formFieldStyle6Wrapper: {
      width: "50%",
      paddingVertical: 5,
      zIndex: -1,
    },
    formFieldStyle7Wrapper: {
      width: "50%",
      paddingVertical: 5,
      zIndex: -23,
    },
    rowFieldWrappers: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 9999999,
    },
    checkbox: {
      marginVertical: 4,
      width: hp("1.5%"),
      height: hp("1.5%"),
      borderRadius: 4,
      backgroundColor: color?.buttonPrimary,
      marginLeft: 10,
    },
    formFieldStyle2Text: {
      color: color?.text,
      fontSize: rf(6),
      fontFamily: "IR",
      marginBottom: 6,
    },
    formFieldStyle2: {
      width: "50%",
      height: hp("3.5%"),
      borderWidth: 0.5,
      borderColor: color?.text,
      borderRadius: 6,
    },
    formFieldStyle6: {
      width: "90%",
      height: hp("3.5%"),
    },
    formFieldStyle7: {
      width: "80%",
      height: hp("3.5%"),
      borderWidth: 0.5,
      borderColor: color?.text,
      borderRadius: 6,
    },
    formFieldStyle3Containeer: {
      flexDirection: "row",
      zIndex: -1,
    },
    formFieldStyle3Wrapper: {
      flex: 1,
      paddingVertical: 5,
      marginTop: 10,
      justifyContent: "flex-end",
    },
    formFieldStyle3: {
      width: "100%",
      minHeight: hp("2%"),
      borderBottomWidth: 0.5,
      borderColor: color?.text,
      borderRadius: 6,
    },
    formFieldStyle3ButtonWrapper: {
      width: "80%",
      height: hp("4%"),
      borderWidth: 0.5,
      borderRadius: 6,
      borderColor: color?.text,
      padding: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    formFieldStyleSmallText: {
      color: color?.text,
      fontSize: rf(5.5),
      fontFamily: "IR",
      paddingHorizontal: 5,
    },
    formFieldStyleNormalText: {
      color: color?.text,
      fontSize: rf(6),
      fontFamily: "IR",
    },
    builtinInput: {
      flex: 1,
      marginHorizontal: "5%",
      color: color?.text,
      fontSize: rf(6),
    },
    rowFieldWrappers2: {
      width: "100%",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginTop: hp("2%"),
      zIndex: -9,
    },
    formFieldStyle8Wrapper: {
      height: hp("4%"),
      width: "48%",
    },
    formSubmitBtn: {
      width: "48%",
      height: hp("4%"),
      backgroundColor: color.buttonPrimary,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      paddingHorizontal: 5,
    },
    formSubmitBtnText: {
      color: color?.buttonText,
      fontSize: rf(6),
      fontFamily: "IR",
    },
    formFieldStyle8WrapperField: {
      height: "60%",
      color: color?.text,
      fontSize: rf(6),
      borderBottomWidth: 0.5,
      borderColor: color.text,
    },
    formFieldStyle8WrapperFieldText: {
      color: color?.text,
      fontSize: rf(6),
      fontFamily: "IR",
    },
    rowFieldWrappers3: {
      flexDirection: "row",
      alignItems: "flex-start",
      zIndex: 9999999,
      width: "100%",
      paddingVertical: hp("1%"),
    },
  });

  useEffect(() => {
    setLoading(props?.calendarPopup);
  }, [props?.calendarPopup]);

  return (
    <View style={styles.formLeft}>
      {/* Field 1 Starts here */}
      <View style={styles.formFieldStyle1}>
        <DropDown
          placeholder="Seleccione el servicio"
          items={categories(props, styles)}
          formData={props?.formData}
          setFormData={props?.setFormData}
          type="category"
        />
      </View>

      {/* Field 2 Starts here */}
      {/* <View style={styles.formFieldStyle2Wrapper}>
        <View style={styles.formFieldStyle2}>
          <TextInput
            style={styles.builtinInput}
            placeholder="Agente"
            placeholderTextColor={color?.text}
            onChangeText={(val) =>
              props?.setFormData((prev) => ({ ...prev, agenda: val }))
            }
            value={props?.formData?.agenda}
          />
        </View>
      </View> */}
      <View style={styles.rowFieldWrappers3}>
        <View style={styles.formFieldStyle6Wrapper}>
          <View style={styles.formFieldStyle6}>
            <DropDown
              formData={props?.formData}
              setFormData={props?.setFormData}
              type="worker"
              placeholder="Agente"
              items={props?.workers || []}
              style={{ height: hp("3.5%") }}
            />
          </View>
        </View>
      </View>
      {/* Field 3 Starts here */}
      <View style={styles.formFieldStyle3Containeer}>
        <View style={styles.formFieldStyle3Wrapper}>
          <Text style={styles.formFieldStyle2Text}>Fecha de sesion</Text>
          <TouchableOpacity style={styles.formFieldStyle3}>
            <Text style={styles.formFieldStyleSmallText}>
              {props?.formData?.bookingDate || "01/05/2022"}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.formFieldStyle3Wrapper, { alignItems: "flex-end" }]}
        >
          <TouchableOpacity
            style={styles.formFieldStyle3ButtonWrapper}
            onPress={async () => {
              await setLoading(true);
              setTimeout(() => {
                props?.onOpenCalendar();
              }, 500);
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color={color?.buttonPrimary} />
            ) : (
              <>
                <Feather name="calendar" size={rf(8)} color={color?.text} />
                <Text style={styles.formFieldStyleNormalText}>
                  Ver Calendario
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* Field 4 Starts here */}
      <SelectTime formData={props?.formData} setFormData={props?.setFormData} />
      <View style={{ width: "100%" }}>
        <ClientDetailsForm
          formData={props?.formData}
          setFormData={props?.setFormData}
          memoizeClients={props?.memoizeClients}
        />
        <View style={styles.rowFieldWrappers}>
          {/* Field 6 Starts here */}
          <View style={styles.formFieldStyle6Wrapper}>
            <Text style={styles.formFieldStyle2Text}>Método de Pago </Text>
            <View style={styles.formFieldStyle6}>
              <DropDown
                formData={props?.formData}
                setFormData={props?.setFormData}
                type="paymentMethod"
                placeholder="Método de Pago"
                items={(props, styles) => {
                  return [
                    {
                      label: "Cash",
                      value: "Cash",
                      icon: () => (
                        <Ionicons
                          name="cash"
                          size={rf(10)}
                          color={color?.text}
                          style={{ marginLeft: 5 }}
                        />
                      ),
                    },
                    {
                      label: "Card",
                      value: "Card",
                      icon: () => (
                        <FontAwesome
                          name="cc-mastercard"
                          size={rf(10)}
                          color={color?.text}
                          style={{ marginLeft: 5 }}
                        />
                      ),
                    },
                  ];
                }}
                style={{ height: hp("3.5%") }}
              />
            </View>
          </View>
          {/* Field 7 Starts here */}
          <View style={styles.formFieldStyle7Wrapper}>
            <Text style={styles.formFieldStyle2Text}>Precio depositoy</Text>
            <View style={styles.formFieldStyle7}>
              <TextInput
                style={styles.builtinInput}
                placeholder="No es Aplicable"
                keyboardType="number-pad"
                placeholderTextColor={color?.text}
                onChangeText={(val) =>
                  props?.setFormData((prev) => ({ ...prev, paymentPrice: val }))
                }
                value={props?.formData?.paymentPrice}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Field 6 and 7 ends here */}
      <View style={styles.rowFieldWrappers2}>
        {/* <View style={styles.formFieldStyle8Wrapper}>
          <Text style={styles.formFieldStyle8WrapperFieldText}>
            Precio a pagar por el sercicio
          </Text>
          <TextInput
            placeholder="0 €"
            style={styles.formFieldStyle8WrapperField}
            placeholderTextColor={color?.text}
            keyboardType="number-pad"
            onChangeText={(val) =>
              props?.setFormData((prev) => ({ ...prev, servicePrice: val }))
            }
            value={props?.formData?.servicePrice}
          />
        </View> */}
        <TouchableOpacity
          style={styles.formSubmitBtn}
          onPress={props?.onSubmit}
        >
          <Text style={styles.formSubmitBtnText}>Crear cita</Text>
        </TouchableOpacity>
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
  changeTheme,
  colorScheme,
})(FormLeft);

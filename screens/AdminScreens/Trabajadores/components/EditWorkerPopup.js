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
  Modal,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { colorScheme } from "../../../../state-management/actions/Theme";
import { AntDesign, Feather } from "@expo/vector-icons";
import CustomTextField from "./CustomTextField";
import SignaturePopup from "./SignaturePopup";
import * as ImagePicker from "expo-image-picker";
import { editWorkerAccountByAdmin } from "../../../../state-management/actions/auth/FirebaseAuthActions";

const EditWorkerPopup = (props) => {
  const [loading, setLoading] = useState(false);
  const [signaturePopup, setSignaturePopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "shani",
    email: "shani23@gmail.com",
    password: "12345678",
    phone: "2323",
    direccion: "hello",
    surname: "karim",
    DNI: 4156,
    instagram: "@shanikhaskheli",
    payByPercent: "30",
    payByFix: "23",
    selectedPayMethod: "%",
    selectedWorkerSkill: "Tutuador/a",
    socialSecurityNumber: "2323",
    profile: null,
    workerSign: null,
    role: "worker",
  });

  let color = props?.color_scheme;

  useEffect(() => {
    setFormData(props?.data?.data);
  }, [props?.createPopupVisible]);

  let formFieldsArr = [
    { name: "name", label: "Nombre" },
    { name: "surname", label: "Apellidos" },
    { name: "DNI", label: "DNI / NIF" },
    { name: "instagram", label: "Instagram" },
    { name: "payByPercent", label: "%" },
    { name: "payByFix", label: "Paga" },
    { name: "email", label: "Correo Electronico" },
    { name: "password", label: "Password" },
    { name: "phone", label: "Telefono" },
    { name: "socialSecurityNumber", label: "Seg. Social" },
    { name: "direccion", label: "Direccion" },
    { name: "workerSign", label: "Firma" },
  ];

  let workerSkillArr = ["Tutuador/a", "Anillador/a", "Estetisista/a"];

  const styles = StyleSheet.create({
    container: {
      width: wp("100%"),
      height: hp("100%"),
      position: "absolute",

      alignItems: "center",
      justifyContent: "center",
    },
    loader: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    modalView: {
      width: wp("100%"),
      height: hp("100%"),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(4,4,4,0.5)",
      position: "absolute",
    },
    contentView: {
      width: wp("85%"),
      height: hp("60%"),
      backgroundColor: color?.bg,
      borderRadius: 10,
      padding: 20,
    },
    title: {
      fontSize: rf(9.5),
      color: color?.text,
      fontFamily: "IB",
    },
    formWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: hp("3%"),
      flexWrap: "wrap",
    },
    fieldWrapper: {
      width: "18%",
      height: hp("5%"),
      justifyContent: "flex-start",
      marginRight: wp("1%"),
      marginBottom: hp("5%"),
    },
    textField: {
      width: "100%",
      height: "100%",
      borderWidth: 0.5,
      borderColor: color?.bgBorder,
      borderRadius: 5,
      paddingHorizontal: "3%",
      color: color?.text,
      fontFamily: "IM",
      fontSize: rf(8),
    },
    label: {
      fontSize: rf(8),
      color: color?.text,
      fontFamily: "IS",
      bottom: 8,
    },
    ImagePicker: {
      width: "100%",
      height: "100%",
      borderRadius: 5,
      overflow: "hidden",
      borderWidth: 0.5,
      borderColor: color?.bgBorder,
      // marginTop: hp("2%"),
      alignItems: "center",
      justifyContent: "center",
      marginRight: wp("2%"),
    },
    workerTypeWrapper: {
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginLeft: wp("3%"),
    },
    workerTypeInnerCont: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginBottom: hp("1.5%"),
      top: hp("1%"),
    },
    workerTypeCircle: {
      width: wp("1.2%"),
      height: wp("1.2%"),
      borderRadius: 100,
      backgroundColor: color?.buttonPrimary,
      marginRight: 5,
    },
    workerTypeCircleActive: {
      width: wp("1.2%"),
      height: wp("1.2%"),
      borderRadius: 100,
      backgroundColor: color?.buttonText,
      marginRight: 5,
      borderWidth: 3,
      borderColor: color?.buttonPrimary,
    },
    workerTypeLabel: {
      fontSize: rf(8),
      color: color?.text,
      fontFamily: "IS",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    createBtn: {
      width: wp("15%"),
      height: hp("4.5%"),
      backgroundColor: "#7CA1E9",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      zIndex: 999,
      bottom: hp("5%"),
      right: wp("5%"),
    },
    createBtnText: {
      fontSize: rf(8),
      fontFamily: "IM",
      color: color?.buttonText,
    },
    loader: {
      position: "absolute",
      zIndex: 999999999,
      width: "100%",
      height: "100%",
      backgroundColor: "red",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(4,4,4,0.5)",
    },
  });

  const handleChange = (val, name) => {
    formData[name] = val;
    setFormData({ ...formData });
  };

  const onSelectSkill = (val) => {
    formData["selectedWorkerSkill"] = val;
    setFormData({ ...formData });
  };

  const onOpenSignPopup = () => {
    formData["workerSign"] = null;
    setFormData({ ...formData });
    setSignaturePopup(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.IMAGE,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      formData["profile"] = result?.uri;
      setFormData({ ...formData });
    }
  };

  const onCreateWorker = () => {
    let isFormComplete = Object.keys(formData).every(function (x) {
      if (formData[x] === "" || formData[x] === null) {
        return false;
      } else {
        return true;
      }
    });
    if (isFormComplete) {
      setLoading(true);
      props?.editWorkerAccountByAdmin(
        formData,
        setLoading,
        props?.setCreatePopupVisible,
        props?.data?.id
      );
    } else {
      alert("Fill all details");
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props?.createPopupVisible}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalView}
            onPress={() => props?.setCreatePopupVisible(false)}
          ></TouchableOpacity>
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={color?.text} />
            </View>
          )}
          <View style={styles.contentView}>
            <Text style={styles.title}>Editar trabajador</Text>
            {/* form starts here */}
            {signaturePopup && (
              <SignaturePopup
                handleChange={handleChange}
                signaturePopup={signaturePopup}
                setSignaturePopup={setSignaturePopup}
              />
            )}
            <TouchableOpacity style={styles.createBtn} onPress={onCreateWorker}>
              <Text style={styles.createBtnText}>Editar</Text>
            </TouchableOpacity>
            <View style={styles.formWrapper}>
              {formFieldsArr?.map((item, index) => {
                return (
                  <CustomTextField
                    disable={item?.name == "email" || item?.name == "password"}
                    value={formData[item?.name]}
                    formData={formData}
                    onFirmaPress={() => onOpenSignPopup()}
                    key={index}
                    label={item?.label}
                    name={item?.name}
                    onChangeText={handleChange}
                    style={{
                      width:
                        item?.label == "%" || item?.label == "Paga"
                          ? "8%"
                          : item?.label == "Firma"
                          ? "32%"
                          : "18%",
                      height: item?.label == "Firma" ? "35%" : hp("5%"),
                    }}
                  />
                );
              })}
              <View style={[styles.fieldWrapper, { height: "35%" }]}>
                <Text style={styles.label}></Text>
                <TouchableOpacity
                  style={styles.ImagePicker}
                  onPress={pickImage}
                >
                  {formData?.profile == null ? (
                    <AntDesign name="camera" size={rf(20)} color="black" />
                  ) : (
                    <Image
                      source={{ uri: formData?.profile }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.workerTypeWrapper}>
                {workerSkillArr?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.workerTypeInnerCont}
                      onPress={() => onSelectSkill(item)}
                    >
                      <View
                        style={
                          formData.selectedWorkerSkill == item
                            ? styles.workerTypeCircleActive
                            : styles.workerTypeCircle
                        }
                      ></View>
                      <Text style={styles.workerTypeLabel}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {/* form ends here */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});
export default connect(mapStateToProps, {
  colorScheme,
  editWorkerAccountByAdmin,
})(EditWorkerPopup);

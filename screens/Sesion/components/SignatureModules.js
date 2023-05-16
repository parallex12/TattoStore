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
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { AgreementText } from "./AgreementText";
import SignaturePopup from "../../AdminScreens/Trabajadores/components/SignaturePopup";

const SignatureModule = (props) => {
  let { customerSignature, setCustomerSignature, setIsSignatureModuleOpen } =
    props;
  let color = props?.color_scheme;
  const [signaturePopup, setSignaturePopup] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  let agreementSteps = [
    "Para autorizar tatuaje.",
    "Aviso enfermedades y alergias",
    "Advertencia de posibles daños",
    "Permiso difusón audiovisual",
  ];

  const handleChange = (val, name) => {
    setCustomerSignature(val);
  };

  const onOpenSignPopup = () => {
    setSignaturePopup(true);
  };

  const onNext = () => {
    if (currentStep > 2) {
      if (customerSignature == null) {
        setSignaturePopup(true);
      } else {
        setIsSignatureModuleOpen(false);
      }
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <View style={styles(color).container}>
      {signaturePopup && (
        <SignaturePopup
          handleChange={handleChange}
          signaturePopup={signaturePopup}
          setSignaturePopup={setSignaturePopup}
        />
      )}
      <View style={styles(color).header}>
        <Text style={styles(color).title}>Firma consentimiento</Text>
      </View>
      <ScrollView>
        <View style={styles(color)?.content}>
          {/* //Agreement starts here */}
          <View style={styles(color)?.agreementWrapper}>
            <Text style={styles(color).StepTitle}>Título consentimiento.</Text>
            <View style={styles(color)?.contentBox}>
              <Text style={styles(color).contentText}>
                {AgreementText[currentStep]}
              </Text>
            </View>
          </View>
          {/* //Actions Wrapper starts here */}
          <View style={styles(color)?.actionsWrapper}>
            {/* Digital signature here */}
            <View style={styles(color)?.signatureBoxWrapper}>
              <Text style={styles(color).title}>Firma consentimiento</Text>
              <TouchableOpacity
                style={styles(color)?.signatureBox}
                onPress={onOpenSignPopup}
              >
                {customerSignature && (
                  <Image
                    source={{ uri: customerSignature }}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </TouchableOpacity>
            </View>
            {/* Digital signature here */}
            <View style={styles(color)?.stepsTextWrapper}>
              {agreementSteps?.map((item, index) => {
                let activeStepStyle = {
                  fontFamily: index == currentStep ? "IB" : "IR",
                };
                return (
                  <Text
                    style={[styles(color).stepsInnerText, activeStepStyle]}
                    key={index}
                  >
                    {item}
                  </Text>
                );
              })}
            </View>
            {/* Action Buttons here*/}
            <View style={styles(color)?.buttonsWrapper}>
              <TouchableOpacity
                style={styles(color)?.backButton}
                onPress={() => setIsSignatureModuleOpen(false)}
              >
                <Text style={styles(color)?.backButtonText}>Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles(color)?.signButton}
                onPress={onNext}
              >
                <Text style={styles(color)?.signButtonText}>Siguiente</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* //Actions Wrapper starts here */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = (color) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
    },
    header: {
      width: "100%",
      height: hp("6%"),
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: hp("1.5%"),
      backgroundColor: color?.primaryBackground,
      borderBottomWidth: 1,
      borderColor: color?.bgBorder,
    },
    title: {
      fontSize: rf(8),
      color: color?.text,
      fontFamily: "IB",
    },
    content: {
      width: "100%",
      alignItems: "flex-start",
      padding: wp("5%"),
    },
    contentBox: {
      width: "100%",
      height: hp("40%"),
      backgroundColor: color?.primaryBackground,
      borderWidth: 1,
      borderColor: color?.bgBorder,
      padding: wp("5%"),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      marginVertical: hp("2%"),
    },
    StepTitle: {
      fontSize: rf(9),
      color: color?.text,
      fontFamily: "IB",
    },
    contentText: {
      fontSize: rf(8),
      color: color?.text,
      fontFamily: "IM",
    },
    actionsWrapper: {
      width: "100%",
      flexDirection: "row",
      marginTop: hp("5%"),
      alignItems: "flex-end",
    },
    signatureBoxWrapper: {
      width: wp("30%"),
      height: hp("20%"),
      justifyContent: "space-between",
    },
    signatureBox: {
      width: "90%",
      height: hp("15%"),
      backgroundColor: "#fff",
      borderRadius: 4,
      borderWidth: 1,
      borderColor: color?.bgBorder,
    },
    stepsTextWrapper: {
      height: hp("15%"),
      alignItems: "flex-start",
      justifyContent: "space-around",
    },
    stepsInnerText: {
      fontSize: rf(8),
      color: color?.text,
      fontFamily: "IM",
    },
    buttonsWrapper: {
      height: hp("15%"),
      alignItems: "center",
      justifyContent: "flex-end",
      paddingHorizontal: wp("5%"),
    },
    backButton: {
      width: wp("20%"),
      height: hp("5%"),
      backgroundColor: color?.buttonSecondary,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: hp("1%"),
    },
    backButtonText: {
      fontSize: rf(7),
      color: color?.buttonText,
      fontFamily: "IM",
    },
    signButton: {
      width: wp("20%"),
      height: hp("5%"),
      backgroundColor: color?.buttonPrimary,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
    },
    signButtonText: {
      fontSize: rf(7),
      color: color?.buttonText,
      fontFamily: "IM",
    },
  });

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  get_user_details: state.main.get_user_details,
});
export default connect(mapStateToProps, {})(SignatureModule);

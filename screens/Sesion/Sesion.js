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
  Animated,
} from "react-native";
import { connect } from "react-redux";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Form from "./components/Form";
import SessionsPage from "./components/SessionsPage";
import "react-native-gesture-handler";
import ImagePreview from "./components/ImagePreview";
import SignatureModules from "./components/SignatureModules";

const Sesion = (props) => {
  const [sessionPriceMode, setSessionPriceMode] = useState("Timer");
  const [currentSession, setCurrentSession] = useState(null);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [fullScreenIsOpen, setFullScreenIsOpen] = useState(false);
  const [customerSignature, setCustomerSignature] = useState(null);
  const [imageSpecs, setImageSpecs] = useState({ roatate: 0, zoom: 0 });
  const imageAnime = useRef(new Animated.Value(0)).current;
  let color = props?.color_scheme;
  const [loading, setLoading] = useState(false);
  const [buscarCita, setBuscarCita] = useState(false);
  const [isSignatureModuleOpen, setIsSignatureModuleOpen] = useState(false);
  let tattooImage = currentSession?.data?.tattooImage;

  console.log(currentSession)

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
    innerContainer: {
      flex: 1,
      flexDirection: "row",
      paddingHorizontal: wp("3%"),
      paddingVertical: hp("1%"),
      marginTop: hp("0%"),
    },
    cont2Wrapper: {
      height: hp("20%"),
      borderTopWidth: 2,
      borderColor: color?.bgBorder,
      marginTop: hp("1%"),
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: hp("2%"),
    },
    bottomBtn: {
      width: wp("8.5%"),
      height: hp("3.2%"),
      backgroundColor: color?.buttonSecondary,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingHorizontal: wp("1%"),
      margin: 10,
    },
    bottomBtnText: {
      color: color?.buttonText,
      fontSize: rf(9),
      fontFamily: "IS",
    },
    cont2Inner: {
      width: "80%",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SessionsPage
        setIsSessionModalOpen={setIsSessionModalOpen}
        isSessionModalOpen={isSessionModalOpen}
        setCurrentSession={setCurrentSession}
      />
      <Header
        type="worker"
        fullScreenComponent={
          fullScreenIsOpen ? (
            <ImagePreview
              tattooImage={tattooImage}
              setFullScreenIsOpen={setFullScreenIsOpen}
              fullScreenIsOpen={fullScreenIsOpen}
            />
          ) : null
        }
      />
      <View style={styles.body}>
        <SideMenu active="Sesion" navigation={props?.navigation} />
        <View style={styles.contentWrapper}>
          {isSignatureModuleOpen ? (
            <SignatureModules
              setCustomerSignature={setCustomerSignature}
              customerSignature={customerSignature}
              setIsSignatureModuleOpen={setIsSignatureModuleOpen}
            />
          ) : (
            <>
              {/* <ScrollView> */}
              <View style={styles.innerContainer}>
                {/* tatoo Wrapper */}
                <ImagePreview
                  tattooImage={tattooImage}
                  setFullScreenIsOpen={setFullScreenIsOpen}
                />
                {/* tatoo Wrapper */}

                {/* Form starts here */}
                <Form
                  sessionPriceMode={sessionPriceMode}
                  setIsSignatureModuleOpen={setIsSignatureModuleOpen}
                  setSessionPriceMode={setSessionPriceMode}
                  setBuscarCita={setBuscarCita}
                  buscarCita={buscarCita}
                  customerSignature={customerSignature}
                  currentSession={currentSession}
                  setIsSessionModalOpen={setIsSessionModalOpen}
                  isSessionModalOpen={isSessionModalOpen}
                />
                {/* Form ends here */}
              </View>
              <View style={styles.cont2Wrapper}>
                <View style={styles.cont2Inner}>
                  {new Array(15).fill(null)?.map((item, index) => {
                    return (
                      <TouchableOpacity key={index} style={styles.bottomBtn}>
                        <Text style={styles.bottomBtnText}>{index + 1}Rl</Text>
                        <Text style={styles.bottomBtnText}>{index}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              {/* </ScrollView> */}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});

export default connect(mapStateToProps, {})(Sesion);

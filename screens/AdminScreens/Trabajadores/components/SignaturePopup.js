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
import SignatureScreen from "react-native-signature-canvas";
import * as FileSystem from "expo-file-system";

const SignaturePopup = (props) => {
  const [signature, setSignature] = useState(null);

  let color = props?.color_scheme;
  const ref = useRef();
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "rgba(4,4,4,0.5)",
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
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
  });

  const handleOK = async (signature) => {
    try {
      const data = signature;
      const base64Code = data.split("data:image/png;base64,")[1];

      const filename =
        FileSystem.documentDirectory + "sign.png";
      await FileSystem.writeAsStringAsync(filename, base64Code, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setSignature(filename);
    } catch (e) {
      console.log(e.message);
    }
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = async (data) => {
    try {
      props?.handleChange(signature, "workerSign");
      props?.setSignaturePopup(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const wStyle = `.m-signature-pad {box-shadow: none; border: none; margin: 0px;padding:10px} 
  .m-signature-pad--body {}
  .m-signature-pad--footer { margin-top: 20px;}
  body,html {
  width: ${wp("85%")}px; height: ${hp("50%")}px;}`;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props?.signaturePopup}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalView}
            onPress={() => props?.setSignaturePopup(false)}
          ></TouchableOpacity>
          <View style={styles.contentView}>
            <SignatureScreen
              ref={ref}
              onEnd={handleEnd}
              onOK={handleOK}
              onEmpty={handleEmpty}
              onClear={handleClear}
              onGetData={handleData}
              // autoClear={true}
              //   descriptionText={text}
              imageType={"image/png"}
              webStyle={wStyle}
            />
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

export default connect(mapStateToProps, { colorScheme })(SignaturePopup);

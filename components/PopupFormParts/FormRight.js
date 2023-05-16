import React, { useEffect, useState } from "react";
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
} from "react-native";
import { connect } from "react-redux";
import { changeTheme, colorScheme } from "../../state-management/actions/Theme";
import * as ImagePicker from "expo-image-picker";

const FormRight = (props) => {
  let color = props?.color_scheme;
  const [selectedSocialIcon, setSelectedSocialIcon] = useState("Instagram");
  const [tattooImage, setTattooImage] = useState(null);

  let socialIcons = ["Instagram", "Facebook", "Google", "Amazon"];

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.IMAGE,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    if (!result.canceled) {
      setTattooImage(result?.uri);
      props?.setFormData((prev) => ({
        ...prev,
        tattooImage: result?.uri,
      }));
    }
  };

  useEffect(() => {
    setTattooImage(props?.formData?.tattooImage);
    setSelectedSocialIcon(props?.formData?.clientComeFrom);
  }, [props?.formData]);

  const styles = StyleSheet.create({
    formRight: {
      flex: 1,
      zIndex: -1,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingLeft: wp("1%"),
    },
    tattooImageWrapper: {
      width: "100%",
      height: "50%",
      borderRadius: 5,
      borderWidth: 0.5,
      alignItems: "center",
      justifyContent: "center",
    },
    uploadButton: {
      width: "100%",
      height: hp("5%"),
      borderRadius: 6,
      backgroundColor: color?.buttonPrimary,
      marginTop: hp("2%"),
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    uploadButtonText: {
      color: color?.buttonText,
      fontSize: rf(6.6),
      fontFamily: "IS",
    },
    dummyText: {
      color: color?.text,
      fontSize: rf(6),
      fontFamily: "IS",
      marginTop: hp("1.5%"),
    },
    radioBtnListWrapper: {
      flex: 1,
      width: "80%",
      marginTop: hp("2%"),
    },
    radioBtnWrapper: {
      flexDirection: "row",
      marginVertical: hp("1%"),
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
    },
    radioCircle: {
      width: wp("1%"),
      height: wp("1%"),
      backgroundColor: color?.buttonPrimary,
      borderRadius: 100,
      marginRight: 10,
    },
    radioCircleActive: {
      width: wp("1%"),
      height: wp("1%"),
      backgroundColor: color?.primaryBackground,
      borderRadius: 100,
      marginRight: 10,
      borderWidth: 3,
      borderColor: color?.buttonPrimary,
    },
    radioBtnText: {
      color: color?.text,
      fontSize: rf(6),
      fontFamily: "IS",
    },
    tattooImage: {
      width: "100%",
      height: "100%",
    },
  });

  const SocialButton = (data) => {
    return (
      <TouchableOpacity style={styles.radioBtnWrapper} onPress={data?.onPress}>
        <View
          style={
            selectedSocialIcon == data?.title
              ? styles.radioCircleActive
              : styles.radioCircle
          }
        ></View>
        <Text style={styles.radioBtnText}>{data?.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.formRight}>
      <TouchableOpacity style={styles.tattooImageWrapper} onPress={pickImage}>
        {!tattooImage && <Text style={styles.dummyText}>Cargar imagen</Text>}
        {tattooImage && (
          <Image
            source={{ uri: tattooImage }}
            style={styles.tattooImage}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>Subir foto diseño</Text>
      </TouchableOpacity>
      <Text style={styles.dummyText}>Donde nos conocisteis </Text>
      <View style={styles.radioBtnListWrapper}>
        {socialIcons?.map((item, index) => {
          return (
            <SocialButton
              onPress={() => {
                setSelectedSocialIcon(item);
                props?.setFormData((prev) => ({
                  ...prev,
                  clientComeFrom: item,
                }));
              }}
              title={item}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});
export default connect(mapStateToProps, {
  changeTheme,
  colorScheme,
})(FormRight);

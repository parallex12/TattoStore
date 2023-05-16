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
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";
import { colorScheme } from "../../state-management/actions/Theme";
import * as Animatable from "react-native-animatable";
import {
  login,
  joinWorkerAccount,
} from "../../state-management/actions/auth/FirebaseAuthActions";

const Login = (props) => {
  const [loading, setLoading] = useState(true);
  const [formType, setFormType] = useState("normal");
  const [email, setEmail] = useState("");
  const [joiningId, setJoiningId] = useState("");
  const [password, setPassword] = useState("");

  let color = props?.color_scheme;

  useEffect(() => {
    props?.colorScheme(setLoading);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color?.bg,
    },
    content: {
      flex: 1,
      flexDirection: "row",
    },
    col1Content: {
      flex: 1.2,
    },
    col2Content: {
      flex: 1,
      backgroundColor: color?.primaryBackground,
      paddingTop: hp("3%"),
      alignItems: "center",
      justifyContent: "center",
    },
    TitleWrapper: {
      marginVertical: hp("5%"),
    },
    title: {
      fontSize: rf(12),
      color: color?.text,
      fontFamily: "IM",
    },
    fieldWrapper: {
      width: wp("30%"),
      height: hp("6%"),
      borderWidth: 0.5,
      borderRadius: 5,
      borderColor: color?.bgBorder,
      marginVertical: hp("1%"),
    },
    field: {
      width: "100%",
      height: "100%",
      paddingHorizontal: "3%",
      fontFamily: "IR",
      color: color?.text,
      fontSize: rf(8),
    },
    loginBtn: {
      width: wp("12%"),
      height: hp("5%"),
      borderRadius: 5,
      backgroundColor: "#7CA1E9",
      alignItems: "center",
      justifyContent: "center",
      marginTop: hp("2%"),
      alignSelf: "center",
    },
    loginText: {
      fontFamily: "IR",
      color: color?.buttonText,
      fontSize: rf(8),
    },
    logoWrapper: {
      width: wp("50%"),
      height: hp("20%"),
    },
  });

  const onLogin = () => {
    if (formType == "worker") {
      onJoinAsEmployee();
      return;
    }
    if (email?.length > 0 && password?.length > 0) {
      setLoading(true);
      let data = { email: email, password: password };
      props?.login(data, setLoading);
    } else {
      alert("Enter Email and Password");
    }
  };

  const onJoinAsEmployee = () => {
    if (email?.length > 0 && joiningId?.length > 0) {
      let data = { email: email, id: joiningId };
      setLoading(true);
      props?.joinWorkerAccount(data, setLoading);
    } else {
      alert("Enter Email and Password");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.col1Content}>
          <Image
            source={require("../../assets/logo.jpg")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="stretch"
          />
        </View>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.col2Content}>
            <Animatable.View
              animation="fadeInUp"
              //   iterationCount={5}
              direction="alternate"
              style={styles.col2Content}
            >
              <View style={styles.logoWrapper}>
                <Image
                  source={require("../../assets/smallLogo.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.TitleWrapper}>
                <Text style={styles.title}>Welcome to store portal</Text>
              </View>
              <View style={styles.formWrapper}>
                <View style={styles.fieldWrapper}>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={color?.text}
                    style={styles.field}
                    onChangeText={(val) => setEmail(val)}
                    autoCapitalize={false}
                  />
                </View>
                {formType == "normal" && (
                  <View style={styles.fieldWrapper}>
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor={color?.text}
                      style={styles.field}
                      secureTextEntry
                      onChangeText={(val) => setPassword(val)}
                      autoCapitalize={false}
                    />
                  </View>
                )}
                {formType == "worker" && (
                  <View style={styles.fieldWrapper}>
                    <TextInput
                      placeholder="Joining Id"
                      placeholderTextColor={color?.text}
                      style={styles.field}
                      onChangeText={(val) => setJoiningId(val)}
                      autoCapitalize={false}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => !loading && onLogin()}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={color?.buttonText} />
                  ) : (
                    <Text style={styles.loginText}>Login</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() =>
                    setFormType(formType == "worker" ? "normal" : "worker")
                  }
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={color?.buttonText} />
                  ) : (
                    <Text style={styles.loginText}>
                      {formType == "normal" ? "Join as employee" : "Back "}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});
export default connect(mapStateToProps, {
  colorScheme,
  login,
  joinWorkerAccount,
})(Login);

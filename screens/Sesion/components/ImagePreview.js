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
} from "react-native";
import { connect } from "react-redux";
import {
  TapGestureHandler,
  RotationGestureHandler,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const ImagePreview = (props) => {
  let color = props?.color_scheme;
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(1);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const positionX = useSharedValue(0);
  const savedPositionX = useSharedValue(0);
  let fulImgWidth = props.fullScreenIsOpen ? { width: "100%" } : {};

  const positionY = useSharedValue(0);
  const savedPositionY = useSharedValue(0);

  const rotationGesture = Gesture.Rotation()
    .onUpdate((e) => {
      rotation.value = savedRotation.value + e.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      console.log(e.message);
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const panGestureHorizontal = Gesture.Pan()
    .onUpdate((e) => {
      if (savedPositionX.value) {
        positionX.value = savedPositionX.value + e.translationX;
      } else {
        positionX.value = e.translationX;
      }
    })
    .onEnd((e) => {
      savedPositionX.value = positionX.value;
    });

  const panGestureVertical = Gesture.Pan()
    .onUpdate((e) => {
      if (savedPositionY.value) {
        positionY.value = savedPositionY.value + e.translationY;
      } else {
        positionY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      savedPositionY.value = positionY.value;
    });

  const multipleGestures = Gesture.Simultaneous(
    pinchGesture,
    rotationGesture,
    panGestureHorizontal,
    panGestureVertical
  ); //Here

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateZ: `${(rotation.value / Math.PI) * 180}deg` },
      { scale: scale.value },
    ],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
    ],
  }));

  const reset = () => {
    scale.value = 1;
    rotation.value = 0;
    positionX.value = 0;
    positionY.value = 0;
  };

  return (
    <View style={[styles(color, fulImgWidth).fullImgWrapper, fulImgWidth]}>
      <TouchableOpacity
        onPress={() => props?.setFullScreenIsOpen((prev) => !prev)}
        style={styles(color)?.fullIconView}
      >
        <MaterialIcons name="fullscreen" size={rf(20)} color={color?.bg} />
      </TouchableOpacity>
      <TouchableOpacity style={styles(color)?.resetBtn} onPress={reset}>
        <Feather name="refresh-ccw" size={24} color={color?.text} />
      </TouchableOpacity>
      <GestureDetector gesture={multipleGestures}>
        <Animated.View style={[styles(color).tattoCont, animatedStyle2]}>
          <Animated.View style={[styles.tattoWrapper, animatedStyle]}>
            <Image
              source={
                props?.tattooImage != null
                  ? { uri: props?.tattooImage }
                  : require("../../../assets/tatto.png")
              }
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = (color) =>
  StyleSheet.create({
    tattoCont: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      width: wp("50%"),
      height: hp("65%"),
    },
    fullImgWrapper: {
      overflow: "hidden",
      backgroundColor: color.bg,
      height: "95%",
      alignItems: "center",
      justifyContent: "center",
    },
    fullIconView: {
      position: "absolute",
      right: 7,
      top: 7,
      zIndex: 90000,
      width: hp("4%"),
      height: hp("4%"),
      borderRadius: 100,
      backgroundColor: color?.buttonPrimary,
    },
    tattoWrapper: {
      width: wp("50%"),
      height: hp("65%"),
      backgroundColor: "#222",
      overflow: "hidden",
      borderRadius: 10,
    },
    resetBtn: {
      position: "absolute",
      zIndex: 999999999999,
      left: 7,
      top: 7,
    },
  });

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  get_all_appiontments: state.main.get_all_appiontments,
});

export default connect(mapStateToProps, {})(ImagePreview);

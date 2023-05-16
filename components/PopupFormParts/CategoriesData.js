import { StyleSheet, View } from "react-native";
export const categories = (props,styles) => {
  return [
    {
      label: "Tatuajes",
      value: "Tatuajes",
      icon: () => <View style={styles?.checkbox}></View>,
    },
    {
      label: "MicroBlanding-MicroPigmentacion",
      value: "MicroBlanding-MicroPigmentacion",
      icon: () => <View style={styles?.checkbox}></View>,
    },
    {
      label: "Maoris Tribales etc..",
      value: "Maoris Tribales etc..",
      icon: () => <View style={styles?.checkbox}></View>,
    },
    {
      label: "Tatuajes Realistas",
      value: "Tatuajes Realistas",
      icon: () => <View style={styles?.checkbox}></View>,
    },
    {
      label: "Piercings",
      value: "Piercings",
      icon: () => <View style={styles?.checkbox}></View>,
    },
  ];
};

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/AuthScreens/Login";

const { Navigator, Screen } = createStackNavigator();

function AppNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}
export const UnAuthNavigator = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);

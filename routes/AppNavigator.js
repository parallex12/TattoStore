import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screens/Dashboard/Dashboard";
import Agenda from "../screens/Agenda/Agenda";
import Gestor from "../screens/Gestor/Gestor";
import Sesion from "../screens/Sesion/Sesion";
import Tiends from "../screens/Tiends/Tiends";
import ViewAgenda from "../screens/ViewAgenda/ViewAgenda";
import AdminDashboard from "../screens/AdminScreens/Dashboard/AdminDashboard";
import AdminTiends from "../screens/AdminScreens/Tiends/AdminTiends";
import AdminTrabajadores from "../screens/AdminScreens/Trabajadores/AdminTrabajadores";
const { Navigator, Screen } = createStackNavigator();

function AppNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Agenda" component={Agenda} />
      <Screen name="ViewAgenda" component={ViewAgenda} />
      <Screen name="Gestor" component={Gestor} />
      <Screen name="Sesion" component={Sesion} />
      <Screen name="Tiends" component={Tiends} />
      <Screen name="AdminDashboard" component={AdminDashboard} />
      <Screen name="AdminTrabajadores" component={AdminTrabajadores} />
      <Screen name="AdminTiends" component={AdminTiends} />
    </Navigator>
  );
}
export const AppNavigator = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);

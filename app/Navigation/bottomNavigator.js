import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  TabBar,
  TopNavigation,
  Text,
  TopNavigationAction,
  Icon,
} from "@ui-kitten/components";
import { SafeAreaView, View } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import PdfScreen from "../screens/PdfScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AllLoadsScreen from "../screens/AllLoadsScreen";
import NewLoadScreen from "../screens/NewLoadScreen";
import LoadDetailScreen from "../screens/LoadDetailScreen";
import AllFilesScreen from "../screens/AllFilesScreen";
import { NewLoadButton } from "./NewLoadButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => (
  <Tab.Navigator>
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="NewLoad"
      component={NewLoadScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewLoadButton onPress={() => navigation.navigate("NewLoad")} />
        ),
      })}
    />
    <Tab.Screen
      name="AllLoads"
      component={AllLoadsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, SafeAreaView, View } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import PdfScreen from "../screens/PdfScreen";
import DashboardScreen from "../screens/DashboardScreen1";
import AllLoadsScreen from "../screens/AllLoadsScreen";
import NewLoadScreen from "../screens/NewLoadScreen1";
import LoadDetailScreen from "../screens/LoadDetailScreen";
import AllFilesScreen from "../screens/AllFilesScreen";
import { NewLoadButton } from "./NewLoadButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import TabNavigator from "./bottomNavigator";
import AllInvoicesScreen from "../screens/AllInvoices";
import AllFoldersScreen from "../screens/AllFoldersScreen";
import useNotifications from "../hooks/useNotifications";
import AdminPanelScreen from "../screens/AdminPanelScreen";
import CreateUserScreen from "../screens/adminScreens/createUserScreen";
import AllUsersScreen from "../screens/adminScreens/AllUsersScreen";
import UserInfoScreen from "../screens/adminScreens/UserInfoScreen";
import AllStationsScreen from "../screens/adminScreens/AllStationsScreen";
import CityInfoScreen from "../screens/adminScreens/CityInfoScreen";
import AllCitiesScreen from "../screens/adminScreens/AllCitiesScreen";
import NewCityScreen from "../screens/adminScreens/NewCityScreen";
import AllFolders_Admin from "../screens/adminScreens/Admin_AllFolders";
import FolderInfoScreen from "../screens/adminScreens/FolderInfoScreen";
import AllFiles_Admin from "../screens/adminScreens/Admin_AllFiles";
import ScheduleScreen from "../screens/ScheduleScreen";
import NewStationScreen from "../screens/adminScreens/NewStationScreen";
import EditLoadScreen from "../screens/adminScreens/EditLoadScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  useNotifications();
  const options = {
    gestureEnabled: true, // If you want to swipe back like iOS on Android
    ...TransitionPresets.SlideFromRightIOS,
  };
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={options}
      />
      <Stack.Screen
        name="AllInvoices"
        component={AllInvoicesScreen}
        options={options}
      />
      <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={options}
      />
      <Stack.Screen name="Login" component={LoginScreen} options={options} />
      <Stack.Screen
        name="NewLoad"
        component={NewLoadScreen}
        options={options}
      />
      <Stack.Screen
        name="AllLoads"
        component={AllLoadsScreen}
        options={options}
      />
      <Stack.Screen
        name="LoadDetail"
        component={LoadDetailScreen}
        options={options}
      />
      <Stack.Screen
        name="AllFolders"
        component={AllFoldersScreen}
        options={options}
      />
      <Stack.Screen
        name="AllFiles"
        component={AllFilesScreen}
        options={options}
      />
      <Stack.Screen name="PdfScreen" component={PdfScreen} options={options} />
      <Stack.Screen
        name="AdminPanel"
        component={AdminPanelScreen}
        options={options}
      />
      <Stack.Screen
        name="AllUsers"
        component={AllUsersScreen}
        options={options}
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUserScreen}
        options={options}
      />
      <Stack.Screen
        name="UserInfo"
        component={UserInfoScreen}
        options={options}
      />
      <Stack.Screen
        name="AllCities"
        component={AllCitiesScreen}
        options={options}
      />
      <Stack.Screen
        name="CreateCity"
        component={NewCityScreen}
        options={options}
      />
      <Stack.Screen
        name="CityInfo"
        component={CityInfoScreen}
        options={options}
      />
      <Stack.Screen
        name="AllStations"
        component={AllStationsScreen}
        options={options}
      />
      <Stack.Screen
        name="AllFoldersAdmin"
        component={AllFolders_Admin}
        options={options}
      />
      <Stack.Screen
        name="FolderInfo"
        component={FolderInfoScreen}
        options={options}
      />
      <Stack.Screen
        name="AllFilesAdmin"
        component={AllFiles_Admin}
        options={options}
      />
      <Stack.Screen
        name="EditLoad"
        component={EditLoadScreen}
        options={options}
      />
      <Stack.Screen
        name="NewStation"
        component={NewStationScreen}
        options={options}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = (props) => (
  <Tab.Navigator>
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
      name="Dashboard"
      component={DashboardScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
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

export const DashboardTabNavigator = () => <HomeNavigator />;

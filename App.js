import React, { useState } from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Layout,
  Text,
  Divider,
  IconRegistry,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { DashboardTabNavigator } from "./app/Navigation/dashboardNavigator";
import { default as theme } from "./app/assets/custom-theme.json";
import AuthNavigator from "./app/Navigation/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./app/auth/context";
import AppLoading from "expo-app-loading";
import authStorage from "./app/auth/storage";
import { Alert } from "react-native";
import { navigationRef } from "./app/Navigation/rootNavigation";
import { NavContainer } from "./app/Navigation/AppNavigationContainer";
//import OfflineNotice from "./app/components/OfflineNotice";

export default () => {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };
  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={() => Alert.alert("An error occured")}
      />
    );
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <AuthContext.Provider value={{ user, setUser }}>
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <NavContainer />
        </ApplicationProvider>
      </AuthContext.Provider>
    </>
  );
};

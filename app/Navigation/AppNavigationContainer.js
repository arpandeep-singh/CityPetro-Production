import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { DashboardTabNavigator } from "./dashboardNavigator";

import { navigationRef } from "./rootNavigation";
import useAuth from "../auth/useAuth";

export const NavContainer = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer ref={navigationRef}>
      {!user ? <AuthNavigator /> : <DashboardTabNavigator />}
    </NavigationContainer>
  );
};

// user==null {}

import jwtDecode from "jwt-decode";
import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./storage";
import CodePush from "react-native-code-push";

import expoPushTokensApi from "../api/expoPushTokens";
import * as Notifications from "expo-notifications";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    authStorage.storeToken(authToken);
    setUser(user);
  };
  const logout = async () => {
    const pushToken = await Notifications.getExpoPushTokenAsync();
    expoPushTokensApi.removePushToken(pushToken.data);
    await authStorage.removeToken();
    CodePush.restartApp();
  };

  const isAdmin = () => {
    if (user?.role == "admin") {
      return true;
    }
    return false;
  };

  return { user, logout, logIn, isAdmin };
};

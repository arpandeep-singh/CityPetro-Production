import React from "react";
import { Text } from "@ui-kitten/components";

import { StyleSheet, Platform } from "react-native";

function AppText({ children, ...otherProps }) {
  return (
    <Text {...otherProps} style={styles[Platform.OS]}>
      {children}
    </Text>
  );
}
const styles = StyleSheet.create({
  ios: {},
  android: {
    fontFamily: "Roboto",
  },
});

export default AppText;

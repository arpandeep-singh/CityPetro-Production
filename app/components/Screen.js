import React from "react";
import Constants from "expo-constants";
import { SafeAreaView, StyleSheet } from "react-native";
import { Layout, useTheme } from "@ui-kitten/components";

function Screen({ children }) {
  const theme = useTheme();
  return (
    <Layout
      style={[styles.screen, { backgroundColor: theme["color-primary-500"] }]}
    >
      {children}
    </Layout>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default Screen;

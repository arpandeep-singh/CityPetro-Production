import React from "react";
import {
  Layout,
  TopNavigation,
  Divider,
  TopNavigationAction,
  Icon,
  ActivityIndicator,
} from "@ui-kitten/components";
import AppText from "../components/AppText";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import Screen from "../components/Screen";

//shoul get message if file is deleted from backend

const PdfReader = ({ url: uri }) => (
  <WebView
    //style={{ padding: 20 }}
    startInLoadingState={true}
    allowFileAccessFromFileURLs={true}
    source={{
      uri,
      //     html: `<html>
      //     <head>
      //      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      //     </head>
      //     <style>
      //      body {background-color: gainsboro;}
      //      object {background-color: white;}
      //     </style>
      //     <body>
      //      <object width="100%"  data=${uri}></object>
      //    </body>
      //  </html>`,
    }}
  />
);

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export default PdfScreen = (prop) => {
  const url = prop.route.params.url;
  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              alignment="start"
              {...prop}
              title="Document"
              accessoryLeft={(props) => (
                <TopNavigationAction
                  icon={BackIcon}
                  onPress={() => prop.navigation.goBack()}
                />
              )}
            />
            <Divider />
          </SafeAreaView>
          <View style={styles.container}>
            <PdfReader {...prop} url={url} />
          </View>
        </Layout>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { Input } from "@ui-kitten/components";
import React from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import AppText from "../components/AppText";

const KeyboardAvoidingComponentScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View
            style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
          >
            <AppText category="h1" status="primary">
              CITY PETRO
            </AppText>
            <AppText category="label" appearance="hint">
              KULDEEP SINGH JOSAN
            </AppText>
          </View>
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={{ marginBottom: 36 }}>
            <AppText category="s1">UPT SHIFT ID</AppText>
            <View style={{ margin: 3 }} />
            <Input />
          </View>
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

export default KeyboardAvoidingComponentScreen;

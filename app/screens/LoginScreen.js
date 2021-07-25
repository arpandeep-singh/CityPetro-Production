import React, { useContext, useReducer, useState, useEffect } from "react";
import {
  Button,
  Icon,
  Layout,
  Input,
  useTheme,
  Spinner,
} from "@ui-kitten/components";
import AppText from "../components/AppText";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const LoadingIndicator = (props) => (
  <View
    style={[props.style, { justifyContent: "center", alignItems: "center" }]}
  >
    <Spinner size="small" />
  </View>
);

const InputAccessoriesShowcase = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    const result = await authApi.login(email, password);
    setLoading(false);
    setLoginFailed(!result.ok);

    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    auth.logIn(result.data.token);
  };

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  const renderUsernameIcon = (props) => (
    <TouchableWithoutFeedback>
      <Icon {...props} name="person" />
    </TouchableWithoutFeedback>
  );

  return (
    <Formik
      initialValues={{ email: " ", password: " " }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <>
          <AppFormField
            label="USERNAME"
            autoCapitalize="none"
            autoCorrect={false}
            name="email"
            placeholder="Enter your username"
            accessoryRight={renderUsernameIcon}
            style={styles.input}
          />
          <AppFormField
            label="PASSWORD"
            name="password"
            placeholder="Enter your password"
            autoCapitalize="none"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            textContentType="password"
            style={styles.input}
          />

          <SubmitButton title="LOG IN" disabled={loading} />
          {loading && (
            <View
              style={{
                alignSelf: "center",
                justifyContent: "flex-start",

                flex: 1,
              }}
            >
              <Spinner />
            </View>
          )}
        </>
      )}
    </Formik>
  );
};

const LoginScreen = () => {
  const theme = useTheme();
  return (
    <Layout
      level="1"
      style={{
        padding: 20,
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <AppText category="h1" status="primary">
          CITY PETRO
        </AppText>
      </View>
      <View style={{ flex: 3 }}>
        <InputAccessoriesShowcase />
        {/* <View style={{ alignItems: "center" }}>
          <AppText status="danger">Invalid username or password</AppText>
        </View> */}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
});

export default LoginScreen;

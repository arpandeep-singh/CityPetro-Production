import React from "react";
import { View } from "react-native";
import {
  Button,
  CheckBox,
  Datepicker,
  Divider,
  Input,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import {
  ArrowForwardIconOutline,
  FacebookIcon,
  GoogleIcon,
  HeartIconFill,
  TwitterIcon,
} from "./extra/icons";
import { KeyboardAvoidingView } from "./extra/3rd-party";

const Kitten1 = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = () => {
    navigation && navigation.goBack();
  };

  const renderCheckboxLabel = React.useCallback(
    (evaProps) => (
      <Text {...evaProps} style={styles.termsCheckBoxText}>
        By creating an account, I agree to the Ewa Terms of\nUse and Privacy
        Policy
      </Text>
    ),
    []
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.emailSignLabel}>Sign up with Email</Text>
      <View style={[styles.container, styles.formContainer]}>
        <Input
          placeholder="Ally"
          label="FIRST NAME"
          autoCapitalize="words"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Input
          style={styles.formInput}
          placeholder="Watsan"
          label="LAST NAME"
          autoCapitalize="words"
          value={lastName}
          onChangeText={setLastName}
        />
        <Datepicker
          style={styles.formInput}
          placeholder="18/10/1995"
          label="Date of Birth"
          date={dob}
          onSelect={setDob}
        />
        <Input
          style={styles.formInput}
          placeholder="ally.watsan@gmail.com"
          label="EMAIL"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.formInput}
          label="PASSWORD"
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        style={styles.signUpButton}
        size="large"
        onPress={onSignUpButtonPress}
      >
        SIGN UP
      </Button>
    </KeyboardAvoidingView>
  );
};

export default Kitten1;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  headerContainer: {
    minHeight: 216,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 44,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16,
  },
  formContainer: {
    marginTop: 48,
    paddingHorizontal: 16,
  },
  evaButton: {
    maxWidth: 72,
    paddingHorizontal: 0,
  },
  signInLabel: {
    flex: 1,
  },
  signInButton: {
    flexDirection: "row-reverse",
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  socialAuthIcon: {
    tintColor: "text-basic-color",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 52,
  },
  divider: {
    flex: 1,
  },
  orLabel: {
    marginHorizontal: 8,
  },
  emailSignLabel: {
    alignSelf: "center",
    marginTop: 8,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 20,
  },
  termsCheckBoxText: {
    fontSize: 11,
    lineHeight: 14,
    color: "text-hint-color",
    marginLeft: 10,
  },
});

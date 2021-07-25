import React from "react";
import { useFormikContext } from "formik";
import { Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

function SubmitButton({ title, ...props }) {
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      appearance="filled"
      style={styles.button}
      onPress={handleSubmit}
      {...props}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
});

export default SubmitButton;

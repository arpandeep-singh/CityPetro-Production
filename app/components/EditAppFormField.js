import React from "react";
import { useFormikContext } from "formik";
import { Input, Icon } from "@ui-kitten/components";
import AppText from "./AppText";
import { View } from "react-native";
const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

function EditAppFormField({ label, name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <View
      style={{
        flexDirection: "row",
        //flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <AppText>{label}</AppText>
      </View>
      <View style={{ flex: 1 }}>
        <Input
          caption={touched[name] && errors[name]}
          captionIcon={touched[name] && errors[name] && AlertIcon}
          onBlur={() => setFieldTouched(name)}
          onChangeText={handleChange(name)}
          status={touched[name] && errors[name] && "danger"}
          returnKeyType="next"
          {...otherProps}
        />
      </View>
    </View>
  );
}

export default EditAppFormField;

import React from "react";
import { useFormikContext } from "formik";
import { Input, Icon } from "@ui-kitten/components";

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

function AppFormField({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <Input
      caption={touched[name] && errors[name]}
      captionIcon={touched[name] && errors[name] && AlertIcon}
      onBlur={() => setFieldTouched(name)}
      onChangeText={handleChange(name)}
      status={touched[name] && errors[name] && "danger"}
      returnKeyType="next"
      {...otherProps}
    />
  );
}

export default AppFormField;

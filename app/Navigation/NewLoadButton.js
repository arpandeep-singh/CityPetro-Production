import React from "react";
import { View, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@ui-kitten/components";

const NewLoadButton = ({ onPress }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme["color-primary-default"],
          borderColor: "white",
          borderWidth: 10,
          bottom: 20,
          height: 80,
          width: 80,
          borderRadius: 40,
        }}
      >
        <MaterialCommunityIcons name="plus-circle" color="white" size={44} />
      </View>
    </TouchableOpacity>
  );
};

export default NewLoadButton;

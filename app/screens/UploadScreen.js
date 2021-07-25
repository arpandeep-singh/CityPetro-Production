import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";
import { useTheme } from "@ui-kitten/components";

const UploadScreen = ({ progress = 0, visible = false, onDone, error }) => {
  const theme = useTheme();
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <Progress.Bar
            color={theme["color-primary-default"]}
            progress={progress}
            width={200}
          />
        ) : (
          <LottieView
            autoPlay
            loop={false}
            style={styles.animation}
            source={require("../../assets/animations/failed.json")}
            onAnimationFinish={onDone}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  animation: {
    width: 150,
  },
});

export default UploadScreen;

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  TabBar,
  Tab,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Layout,
  List,
  ListItem,
  Divider,
  useTheme,
  Input,
  Button,
  Datepicker,
  RangeDatepicker,
  IconRegistry,
  Spinner,
} from "@ui-kitten/components";
import AppText from "../../components/AppText";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { ScrollView } from "react-native";
import shiftDocsApi from "../../api/shiftDocs";
import { Formik } from "formik";
import * as Yup from "yup";
import AppFormField from "../../components/AppFormField";
import SubmitButton from "../../components/SubmitButton";
import EditAppFormField from "../../components/EditAppFormField";
import Screen from "../../components/Screen";

// import useApi from "../../hooks/useApi";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
});

const FolderInfoScreen = (prop) => {
  const folder = prop.route.params.folder;

  //const [folder, setCity] = React.useState(cityInfo);
  const [editMode, setEditmode] = React.useState(false);

  const [updateFailed, setUpdateFailed] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    const result = await shiftDocsApi.updateFolder(folder?._id, data);
    setLoading(false);
    //setLoginFailed(!result.ok);
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    Alert.alert("Updated Successfully!");
  };

  const initialData = {
    name: folder?.name,
  };

  const handleAskToDelete = async () => {
    Alert.alert("Delete", "Deleting the folder will delete all files", [
      { text: "OK", onPress: async () => await handleDelete() },
      { text: "Cancel" },
    ]);
  };

  const handleDelete = async () => {
    setLoading(true);
    const result = await shiftDocsApi.deleteFolder(folder?._id);
    setLoading(false);
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    Alert.alert("Deleted Successfully!");
    prop.navigation.goBack();
  };

  const handleUploadFile = async (data) => {
    setLoading(true);
    const result = await shiftDocsApi.updateFolder(folder?._id, data);
    setLoading(false);
    //setLoginFailed(!result.ok);
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    Alert.alert("Updated Successfully!");
  };

  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              alignment="center"
              title="Folders"
              subtitle={folder?._id}
              accessoryLeft={() => (
                <TopNavigationAction
                  icon={BackIcon}
                  onPress={() => {
                    prop.navigation.goBack();
                  }}
                />
              )}
            />
          </SafeAreaView>
          <ScrollView>
            <Layout
              level="1"
              style={{
                //flex: 1,
                padding: 10,

                marginVertical: "3%",
                paddingBottom: "5%",
                marginHorizontal: "3%",
                borderRadius: 10,
                alignItems: "stretch",
              }}
            >
              <View style={{ minHeight: "25%" }}>
                <View style={{ margin: 5 }}>
                  <Formik
                    initialValues={initialData}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {() => (
                      <>
                        <View style={{ margin: 5 }}>
                          <AppText category="h6" style={{ marginBottom: 5 }}>
                            Folder Info
                          </AppText>
                          <EditAppFormField
                            label="Name"
                            name="name"
                            defaultValue={folder?.name}
                          />
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 1,
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <View style={{ flex: 1 }}>
                              <AppText>Files</AppText>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Button
                                appearance="ghost"
                                onPress={() =>
                                  prop.navigation.navigate("AllFilesAdmin", {
                                    folder: folder,
                                  })
                                }
                              >
                                View all files
                              </Button>
                            </View>
                          </View>
                        </View>
                        <Divider style={{ margin: 5 }} />

                        <SubmitButton title="SAVE" appearance="filled" />

                        <Button
                          appearance="filled"
                          status="danger"
                          onPress={handleAskToDelete}
                        >
                          DELETE
                        </Button>
                      </>
                    )}
                  </Formik>
                </View>
              </View>
            </Layout>
            <Layout
              level="1"
              style={{
                //flex: 1,
                padding: 10,

                marginVertical: "3%",
                paddingBottom: "5%",
                marginHorizontal: "3%",
                borderRadius: 10,
                alignItems: "stretch",
              }}
            >
              <View style={{ margin: 5 }}>
                <Formik
                  initialValues={{ fileName: "" }}
                  onSubmit={handleUploadFile}
                  validationSchema={validationSchema}
                >
                  {() => (
                    <>
                      <View style={{ margin: 5 }}>
                        <AppText category="h6" style={{ marginBottom: 5 }}>
                          Upload file
                        </AppText>
                        <EditAppFormField label="Name" name="fileName" />
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <AppText>Gallery (image)</AppText>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Button
                              appearance="ghost"
                              onPress={() =>
                                prop.navigation.navigate("AllFilesAdmin", {
                                  folder: folder,
                                })
                              }
                            >
                              SELECT
                            </Button>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <AppText>Files (pdf)</AppText>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Button
                              appearance="ghost"
                              onPress={() =>
                                prop.navigation.navigate("AllFilesAdmin", {
                                  folder: folder,
                                })
                              }
                            >
                              SELECT
                            </Button>
                          </View>
                        </View>
                      </View>
                      <Divider style={{ margin: 5 }} />

                      <SubmitButton title="SAVE" appearance="filled" />
                    </>
                  )}
                </Formik>
              </View>
            </Layout>
          </ScrollView>
        </Layout>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
});

export default FolderInfoScreen;

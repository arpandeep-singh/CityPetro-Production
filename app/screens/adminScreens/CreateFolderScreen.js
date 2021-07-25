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
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import AppText from "../../components/AppText";
import { Alert, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native";
import adminApi from "../../api/admin";
import EditAppFormField from "../../components/EditAppFormField";
import { Formik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../components/SubmitButton";
// import useApi from "../../hooks/useApi";

const levelsData = ["A", "B"];

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
});

const CreateFolderScreen = (prop) => {
  const theme = useTheme();
  const userInfo = prop.route.params.user;

  const [selectedIndex, setSelectedIndex] = React.useState(
    new IndexPath(levelsData.indexOf(userInfo?.level))
  );
  const displayValue = levelsData[selectedIndex.row];
  const renderOption = (title) => <SelectItem title={title} key={title} />;

  const [user, setUser] = React.useState(userInfo);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    const result = await adminApi.updateUser(userInfo._id, data);
    setLoading(false);
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    setUser(result.data.data);
    Alert.alert("Updated Successfully!");
  };

  const handleDelete = async () => {
    setLoading(true);
    const result = await adminApi.deleteUser(user?._id);
    setLoading(false);
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    Alert.alert("Deleted Successfully!");
    prop.navigation.goBack();
  };

  return (
    <>
      <Layout level="2" style={{ flex: 1 }}>
        <SafeAreaView>
          <TopNavigation
            alignment="center"
            title="User Info"
            subtitle={user?.name}
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

        <Formik
          initialValues={{
            name: user?.name,
            email: user?.email,
            contact: user?.contact,
            level: user?.level,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue }) => (
            <View
              style={{
                backgroundColor: "white",
                //flex: 1,
                padding: 10,
                marginTop: "4%",
                marginHorizontal: "4%",
                //borderRadius: 10,
                alignItems: "stretch",
              }}
            >
              <View style={{ minHeight: "25%" }}>
                <View
                  style={{
                    margin: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppText category="p1" appearance="hint">
                    #{userInfo?._id}
                  </AppText>
                  <Button appearance="outline" size="tiny" status="primary">
                    COPY
                  </Button>
                </View>
                <Divider style={{ margin: 5 }} />
                <View style={{ margin: 5 }}>
                  <AppText category="h6" style={{ marginBottom: 5 }}>
                    Personal Info
                  </AppText>

                  <EditAppFormField
                    label="Name"
                    name="name"
                    defaultValue={user?.name}
                  />
                  <EditAppFormField
                    label="Email"
                    name="email"
                    defaultValue={user?.email}
                  />
                  <EditAppFormField
                    label="Contact"
                    name="contact"
                    defaultValue={user?.contact ?? "NA"}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 3 }}>
                      <AppText category="p1">Level</AppText>
                    </View>
                    <View style={{ flex: 3 }}>
                      <Select
                        value={displayValue}
                        selectedIndex={selectedIndex}
                        onSelect={(index) => {
                          setSelectedIndex(index);
                          setFieldValue("level", levelsData[index.row], true);
                        }}
                      >
                        {levelsData.map(renderOption)}
                      </Select>
                    </View>
                  </View>
                </View>
                <Divider style={{ margin: 5 }} />
                <View style={{ margin: 5 }}>
                  <AppText category="h6" style={{ marginBottom: 5 }}>
                    Login Info
                  </AppText>
                  <EditAppFormField
                    label="Email"
                    name="email"
                    disabled={true}
                    defaultValue={user?.email}
                  />
                  <EditAppFormField
                    label="Password"
                    name="password"
                    disabled={true}
                    defaultValue={user?.passwordString ?? "NA"}
                  />
                </View>
                <Divider style={{ margin: 5 }} />
                <View
                  style={{
                    margin: 5,
                  }}
                >
                  <SubmitButton
                    title={loading ? "LOADING" : "SAVE"}
                    disabled={loading}
                  />

                  <Button
                    status="danger"
                    appearance="filled"
                    disabled={loading}
                    onPress={handleDelete}
                  >
                    DELETE
                  </Button>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </Layout>
    </>
  );
};

export default CreateFolderScreen;

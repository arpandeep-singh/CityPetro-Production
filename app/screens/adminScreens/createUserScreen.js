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
import Screen from "../../components/Screen";

const levelsData = ["A", "B"];

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().label("Email"),
  contact: Yup.string().label("Contact"),
  password: Yup.string().min(4).label("Password"),
  level: Yup.string().label("Level"),
});

const CreateUserScreen = (prop) => {
  const [selectedIndex, setSelectedIndex] = React.useState();
  const displayValue = levelsData[selectedIndex?.row] ?? "SELECT";
  const renderOption = (title) => <SelectItem title={title} key={title} />;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    data.password = `${data.name
      .toString()
      .toLowerCase()
      .substring(0, 3)}${data.contact
      .toString()
      .toLowerCase()
      .substring(6, 10)}`;

    setLoading(true);
    const result = await adminApi.createUser(data);
    setLoading(false);
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    Alert.alert("User Created Successfully!");
    prop.navigation.goBack();
  };

  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              alignment="center"
              title="Create User"
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
              name: "",
              email: "",
              contact: "",
              level: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ setFieldValue, values }) => (
              <Layout
                //level="1"
                style={{
                  //flex: 1,
                  padding: 10,
                  marginTop: "4%",
                  marginHorizontal: "4%",
                  borderRadius: 10,
                  alignItems: "stretch",
                }}
              >
                <View style={{ minHeight: "25%" }}>
                  <View style={{ margin: 5 }}>
                    <AppText category="h6" style={{ marginBottom: 5 }}>
                      Personal Info
                    </AppText>

                    <EditAppFormField
                      label="Name"
                      name="name"
                      placeholder="Enter Name"
                    />
                    <EditAppFormField
                      label="Email"
                      name="email"
                      placeholder="Enter Email"
                    />
                    <EditAppFormField
                      label="Contact"
                      name="contact"
                      placeholder="Enter Contact"
                      keyboardType="phone-pad"
                    />
                    <EditAppFormField
                      label="Password"
                      name="password"
                      disabled={true}
                      value={`${values["name"]
                        .toString()
                        .toLowerCase()
                        .substring(0, 3)}${values["contact"]
                        .toString()
                        .toLowerCase()
                        .substring(6, 10)}`}
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
                          placeholder="SELECT"
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
                  <View
                    style={{
                      margin: 5,
                    }}
                  >
                    <SubmitButton
                      title={loading ? "LOADING" : "SAVE"}
                      disabled={loading}
                    />
                  </View>
                </View>
              </Layout>
            )}
          </Formik>
        </Layout>
      </Screen>
    </>
  );
};

export default CreateUserScreen;

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
import adminApi from "../../api/admin";
import { Formik } from "formik";
import * as Yup from "yup";
import AppFormField from "../../components/AppFormField";
import SubmitButton from "../../components/SubmitButton";
import EditAppFormField from "../../components/EditAppFormField";
import { getItemAsync } from "expo-secure-store";
import Screen from "../../components/Screen";

// import useApi from "../../hooks/useApi";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const validationSchema = Yup.object().shape({
  city: Yup.string().required().label("City"),
  rateA_T: Yup.number(),
  rateA_O: Yup.number(),
  rateA_H: Yup.number(),
  rateA_N: Yup.number(),
  rateB_T: Yup.number(),
  rateB_O: Yup.number(),
  rateB_H: Yup.number(),
  rateB_N: Yup.number(),
});

const NewCityScreen = (prop) => {
  const [updateFailed, setUpdateFailed] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialData = {
    city: "",
    rateA_T: 0,
    rateA_H: 0,
    rateA_O: 0,
    rateA_N: 0,
    rateB_T: 0,
    rateB_H: 0,
    rateB_O: 0,
    rateB_N: 0,
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    const postData = {
      rateChart: {
        A: {
          rateToronto: data.rateA_T,
          rateOakville: data.rateA_O,
          rateHamilton: data.rateA_H,
          rateNanticoke: data.rateA_N,
        },
        B: {
          rateToronto: data.rateB_T,
          rateOakville: data.rateB_O,
          rateHamilton: data.rateB_H,
          rateNanticoke: data.rateB_N,
        },
      },
      name: data.city,
    };
    const result = await adminApi.createCity(postData);
    setLoading(false);
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    Alert.alert("Created Successfully!");
  };

  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              alignment="center"
              title="Add a new City"
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
            <View
              style={{
                // backgroundColor: "white",
                //flex: 1,
                padding: 10,

                marginBottom: "10%",
                paddingBottom: "10%",
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
                            City Info
                          </AppText>
                          <EditAppFormField
                            placeholder="Enter city name"
                            label="CITY"
                            name="city"
                          />
                        </View>
                        <Divider style={{ margin: 5 }} />
                        <View style={{ margin: 5 }}>
                          <AppText category="h6" style={{ marginBottom: 5 }}>
                            Rates
                          </AppText>
                          <AppText
                            category="s1"
                            appearance="hint"
                            style={{ marginVertical: 5 }}
                          >
                            Level A
                          </AppText>
                          <EditAppFormField
                            label="TORONTO"
                            name="rateA_T"
                            defaultValue={initialData.rateA_T.toString()}
                            keyboardType="number-pad"
                          />
                          <EditAppFormField
                            label="OAKVILLE"
                            name="rateA_O"
                            defaultValue={initialData.rateA_O.toString()}
                            keyboardType="number-pad"
                          />
                          <EditAppFormField
                            label="HAMILTON"
                            name="rateA_H"
                            defaultValue={initialData.rateA_H.toString()}
                            keyboardType="number-pad"
                          />
                          <EditAppFormField
                            label="NANTICOKE"
                            name="rateA_N"
                            defaultValue={initialData.rateA_N.toString()}
                            keyboardType="number-pad"
                          />
                          <AppText
                            category="s1"
                            appearance="hint"
                            style={{ marginVertical: 5 }}
                          >
                            Level B
                          </AppText>
                          <EditAppFormField
                            label="TORONTO"
                            name="rateB_T"
                            defaultValue={initialData.rateB_T.toString()}
                            keyboardType="number-pad"
                          />
                          <EditAppFormField
                            label="OAKVILLE"
                            name="rateB_O"
                            defaultValue={initialData.rateB_O.toString()}
                            keyboardType="number-pad"
                          />
                          <EditAppFormField
                            label="HAMILTON"
                            name="rateB_H"
                            defaultValue={initialData.rateB_H.toString()}
                            keyboardType="number-pad"
                          />
                          <EditAppFormField
                            label="NANTICOKE"
                            name="rateB_N"
                            defaultValue={initialData.rateB_N.toString()}
                            keyboardType="number-pad"
                          />
                        </View>

                        <SubmitButton title="SUBMIT" appearance="filled" />
                      </>
                    )}
                  </Formik>
                </View>
              </View>
            </View>
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

export default NewCityScreen;

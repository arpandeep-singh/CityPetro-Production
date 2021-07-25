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
const EditIcon = (props) => <Icon {...props} name="edit" />;

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

const CityInfoScreen = (prop) => {
  const cityInfo = prop.route.params.city;

  //console.log(`CITY : ${JSON.stringify(cityInfo)}`);

  const [city, setCity] = React.useState(cityInfo);
  const [editMode, setEditmode] = React.useState(false);

  const [updateFailed, setUpdateFailed] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
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
    setLoading(true);
    const result = await adminApi.updateCity(city?._id, postData);
    setLoading(false);
    //setLoginFailed(!result.ok);
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    Alert.alert("Updated Successfully!");
  };
  const ratesA = city?.rateChart["A"];
  const ratesB = city?.rateChart["B"];

  const initialData = {
    city: city.name,
    rateA_T: ratesA?.rateToronto?.toString(),
    rateA_H: ratesA?.rateHamilton?.toString(),
    rateA_O: ratesA?.rateOakville?.toString(),
    rateA_N: ratesA?.rateToronto?.toString(),
    rateB_T: ratesB?.rateToronto?.toString(),
    rateB_H: ratesB?.rateHamilton?.toString(),
    rateB_O: ratesB?.rateOakville?.toString(),
    rateB_N: ratesB?.rateToronto?.toString(),
  };

  const handleDelete = async () => {
    setLoading(true);
    const result = await adminApi.deleteCity(city?._id);
    setLoading(false);
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    Alert.alert("Deleted Successfully!");
    prop.navigation.goBack();
  };

  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              alignment="center"
              title="City-Terminal Rates"
              subtitle={city?._id}
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
              //level="1"
              style={{
                //flex: 1,
                padding: 10,
                marginHorizontal: "2%",
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
                            label="CITY"
                            name="city"
                            defaultValue={city?.name}
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
                              <AppText>STATIONS</AppText>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Button
                                appearance="ghost"
                                onPress={() =>
                                  prop.navigation.navigate("AllStations", {
                                    stations: city?.stations ?? [],
                                    city: {
                                      cityID: city?._id,
                                      name: city.name,
                                    },
                                  })
                                }
                              >
                                {city?.stations.length} Stations
                              </Button>
                            </View>
                          </View>
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
                            defaultValue={initialData.rateA_T}
                            keyboardType="number-pad"
                          />
                          <EditAppFormField
                            label="OAKVILLE"
                            name="rateA_O"
                            defaultValue={initialData.rateA_O}
                            keyboardType="number-pad"
                          />
                          <EditAppFormField
                            label="HAMILTON"
                            name="rateA_H"
                            defaultValue={initialData.rateA_H}
                            keyboardType="number-pad"
                          />
                          <EditAppFormField
                            label="NANTICOKE"
                            name="rateA_N"
                            defaultValue={initialData.rateA_N}
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
                            defaultValue={initialData.rateB_T}
                            keyboardType="number-pad"
                          />
                          <EditAppFormField
                            label="OAKVILLE"
                            name="rateB_O"
                            defaultValue={initialData.rateB_O}
                            keyboardType="number-pad"
                          />
                          <EditAppFormField
                            label="HAMILTON"
                            name="rateB_H"
                            defaultValue={initialData.rateB_H}
                            keyboardType="number-pad"
                          />
                          <EditAppFormField
                            label="NANTICOKE"
                            name="rateB_N"
                            defaultValue={initialData.rateB_N}
                            keyboardType="number-pad"
                          />
                        </View>

                        <SubmitButton title="SAVE" appearance="filled" />

                        <Button
                          appearance="filled"
                          status="danger"
                          onPress={handleDelete}
                        >
                          DELETE
                        </Button>
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

export default CityInfoScreen;

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
  TouchableOpacity,
  ButtonGroup,
} from "@ui-kitten/components";
import AppText from "../../components/AppText";
import { Alert, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../components/SubmitButton";
import AppFormField from "../../components/AppFormField";
// import useApi from "../../hooks/useApi";
import Screen from "../../components/Screen";
import stationsApi from "../../api/stations";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const validationSchema = Yup.object().shape({
  stationId: Yup.string().required().label("Station ID"),
});

const NewStationScreen = (prop) => {
  const theme = useTheme();
  const city = prop.route.params.city;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    const result = await stationsApi.addStation(data.stationId, city?.cityID);
    setLoading(false);
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    Alert.alert("Added Successfully!");
  };

  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              alignment="center"
              title={`Add new station in ${city?.name}`}
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
              stationId: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <ScrollView>
                <Layout
                  style={{
                    padding: 10,
                    marginTop: "4%",
                    marginHorizontal: "4%",
                    borderRadius: 10,
                  }}
                >
                  <View style={{ minHeight: "25%", margin: 5 }}>
                    <AppFormField name="stationId" label="STATION" />
                    <SubmitButton title="SUBMIT" disabled={loading} />
                  </View>
                </Layout>
              </ScrollView>
            )}
          </Formik>
        </Layout>
      </Screen>
    </>
  );
};

export default NewStationScreen;

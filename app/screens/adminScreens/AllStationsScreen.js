import React, { useState, useEffect } from "react";
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Layout,
  List,
  ListItem,
  Card,
  Button,
  Spinner,
  Input,
  useTheme,
  Modal,
} from "@ui-kitten/components";
import AppText from "../../components/AppText";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Divider,
  Alert,
} from "react-native";
import stationsApi from "../../api/stations";
import AppFormField from "../../components/AppFormField";
import { Formik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../components/SubmitButton";
import Screen from "../../components/Screen";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const PlusIcon = (props) => <Icon {...props} name="plus" />;
const SearchIcon = (props) => <Icon {...props} name="search" />;

const validationSchema = Yup.object().shape({
  stationId: Yup.string().required().label("Station ID"),
});

const AllStationsScreen = (prop) => {
  const theme = useTheme();
  const routeParams = prop.route.params;
  const city = routeParams.city;
  const [filteredData, setFilteredData] = React.useState([]);
  const [masterData, setMasterData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [response, setResponse] = useState({});
  const refreshData = async () => {
    const response = await stationsApi.getSites({ city: city.cityID });
    setFilteredData(response.data.data);
    setMasterData(response.data.data);
  };
  const getData = async () => {
    setLoading(true);
    await refreshData();
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const searchFilter = (text) => {
    setFilteredData(
      masterData.filter(({ stationId }) =>
        stationId.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleSubmit = async (stationId) => {
    if (stationId.length == 0) {
      return Alert.alert("Station ID cant be empty!");
    }
    //setLoading(true);
    const result = await stationsApi.addStation(stationId, city.cityID);
    //setLoading(false);
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    const newStation = result.data.data;
    setFilteredData([...filteredData, newStation]);
    Alert.alert("Added Successfully!");
  };

  const handleDelete = async (station) => {
    //setLoading(true);
    const result = await stationsApi.deleteStation(station._id);
    //setLoading(false);
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    Alert.alert("Deleted Successfully!");
    setFilteredData(
      filteredData.filter(function (s) {
        return s._id != station._id;
      })
    );
  };

  const renderListItem = ({ item, index }) => (
    <View
      style={{
        margin: "1%",
        marginHorizontal: "2%",
        borderRadius: 5,
        padding: "5%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AppText category="s1">{item?.stationId}</AppText>
        <Button
          status="danger"
          appearance="outline"
          size="tiny"
          onPress={() => handleDelete(item)}
        >
          DELETE
        </Button>
      </View>
    </View>
  );

  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              {...prop}
              alignment="start"
              title={`All Stations in ${city?.name}`}
              accessoryRight={() => (
                <TopNavigationAction
                  icon={PlusIcon}
                  onPress={() =>
                    prop.navigation.navigate("NewStation", {
                      city: city,
                    })
                  }
                />
              )}
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

          <Modal
            visible={visible}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onBackdropPress={() => setVisible(false)}
          >
            <Formik
              initialValues={{ email: " ", password: " " }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {() => (
                <View style={{ alignItems: "flex-start" }}>
                  <Card disabled={true} style={{ width: "100%" }}>
                    <AppFormField
                      label="STATION ID"
                      autoCapitalize="none"
                      autoCorrect={false}
                      name="stationId"
                      placeholder="Enter the new station ID"
                      style={styles.input}
                    />
                    <SubmitButton title="SUBMIT" disabled={loading} />
                  </Card>
                </View>
              )}
            </Formik>
          </Modal>
          <View style={{ flex: 1, paddingTop: 10 }}>
            <Layout
              style={{
                //ackgroundColor: theme["color-primary-default"],
                padding: "4%",
                marginBottom: 10,
                marginHorizontal: "2%",
                borderRadius: 5,
              }}
            >
              <AppText category="h6" appearance="hint" status="control">
                Search...
              </AppText>
              <Input
                status="primary"
                style={{ marginTop: "3%" }}
                accessoryRight={SearchIcon}
                onChangeText={searchFilter}
              />
            </Layout>
            {loading && (
              <View style={{ alignContent: "center", alignItems: "center" }}>
                <AppText appearance="hint">Loading...</AppText>
              </View>
            )}
            {!loading && filteredData.length == 0 && (
              <View style={{ alignContent: "center", alignItems: "center" }}>
                <AppText appearance="hint">No Data</AppText>
              </View>
            )}
            {!loading && (
              <List
                data={filteredData}
                {...prop}
                renderItem={renderListItem}
                refreshing={refreshing}
                onRefresh={() => refreshData()}
                style={{ marginBottom: "5%" }}
              />
            )}
          </View>
        </Layout>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    //flex: 1,
    margin: 2,
    flexDirection: "row",
  },
  footerContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "yellow",
  },
  footerControl: {
    marginHorizontal: 2,
  },
  input: {
    marginVertical: 5,
    flex: 1,
  },
});

export default AllStationsScreen;

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
  Spinner,
} from "@ui-kitten/components";
import AppText from "../components/AppText";
import { SafeAreaView, View } from "react-native";
import loadsApi from "../api/loads";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const renderItemIcon = (props) => (
  <View style={{ flexDirection: "row" }}>
    <Icon {...props} name="file-text" />
    {/* <Icon {...props} name="checkmark-circle-2" /> */}
  </View>
);

const renderAmount = (amount) => <AppText category="s1">${amount}</AppText>;

const CalendarIcon = (props) => <Icon {...props} name="calendar" />;

const updatedFilter = (fdate, tdate) => {
  return {
    "date[gte]": fdate.toISOString(),
    "date[lte]": tdate.toISOString(),
    limit: 500,
  };
};

const AllLoadsScreen = (prop) => {
  const theme = useTheme();

  const today = new Date();

  const userForAdminSearch = prop.route.params?.user?._id ?? "";
  const auth = useAuth();

  const startD = today.getDate() >= 15 ? 15 : 1;
  const startOfPeriod = new Date(today.getFullYear(), today.getMonth(), startD);

  const [fdate, setFDate] = React.useState(startOfPeriod);
  const [tdate, setTDate] = React.useState(today);

  // const getLoadsApi = useApi(loadsApi.getLoads);

  let loads = [];
  //let response = {};
  // if (!getLoadsApi.error) {
  //   response = getLoadsApi.data;
  // }

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  let initialFilter = updatedFilter(fdate, tdate);

  const getData = async (...args) => {
    setLoading(true);
    const response = await loadsApi.getLoads(...args);
    setLoading(false);

    setError(!response?.ok);
    setResponse(response?.data);
  };

  const fetchData = (params) => {
    const queryParams = auth.isAdmin()
      ? { ...params, user: userForAdminSearch }
      : params;
    getData(queryParams);
  };
  useEffect(() => {
    fetchData(initialFilter);
  }, []);

  const refreshData = async () => {
    const queryParams = auth.isAdmin()
      ? { ...initialFilter, user: userForAdminSearch }
      : initialFilter;
    const response = await loadsApi.getLoads(queryParams);
    setError(!response?.ok);
    setResponse(response?.data);
  };

  // useEffect(() => {
  //   getLoadsApi.request(initialFilter);
  // }, []);

  const renderItem = ({ item, index }) => (
    <ListItem
      {...prop}
      style={{
        paddingRight: 15,
        marginBottom: 5,
        marginHorizontal: "3%",
        borderRadius: 5,
      }}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => renderAmount(item.totalRate)}
      title={`${item.stationID}`}
      description={`${item.city}`}
      onPress={() => {
        prop.navigation.navigate("LoadDetail", { id: item._id });
      }}
    />
  );

  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              alignment="start"
              title="Reports"
              // style={{ backgroundColor: w}}
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

          <Layout
            level="1"
            style={{
              //backgroundColor: theme["color-primary-default"],
              minHeight: "14%",

              //borderRadius: 5,
              padding: 10,
              marginVertical: 15,
              marginHorizontal: "2%",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <View>
              <AppText
                category="s2"
                appearance="hint"
                //status="control"
                style={{
                  alignSelf: "center",
                }}
              >
                Total Earnings
              </AppText>
              {loading ? (
                <>
                  <AppText
                    category="h1"
                    //status="control"
                    style={{ alignSelf: "center" }}
                  >
                    ****
                  </AppText>
                  <AppText
                    category="s2"
                    appearance="hint"
                    //status="control"
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    {`HST: ****   Waiting: ****`}
                  </AppText>
                </>
              ) : (
                <>
                  <AppText
                    category="h1"
                    //status="control"
                    style={{ alignSelf: "center" }}
                  >
                    ${response?.summary?.totalWithHST}
                  </AppText>
                  <AppText
                    category="s2"
                    appearance="hint"
                    //status="control"
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    {`HST: $${response?.summary?.totalHST}   Waiting: $${response?.summary?.totalWaiting}`}
                  </AppText>
                </>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: "2%",
              }}
            >
              <View style={{ flex: 1, margin: "2%" }}>
                <Datepicker
                  status="primary"
                  placeholder="Pick Date"
                  date={fdate}
                  onSelect={(nextDate) => {
                    setFDate(nextDate);
                    fetchData(updatedFilter(nextDate, tdate));
                  }}
                  accessoryRight={CalendarIcon}
                />
              </View>
              <View style={{ flex: 1, margin: "2%" }}>
                <Datepicker
                  status="primary"
                  placeholder="Pick Date"
                  date={tdate}
                  onSelect={(nextDate) => {
                    setTDate(nextDate);

                    fetchData(updatedFilter(fdate, nextDate));
                  }}
                  accessoryRight={CalendarIcon}
                />
              </View>
            </View>
            {/* <Button
            appearance="outline"
            status="primary"
            style={{ margin: "2%" }}
            disabled={getLoadsApi.loading}
            onPress={() => getLoadsApi.request(updatedFilter(fdate, tdate))}
          >
            SEARCH
          </Button> */}
          </Layout>
          {loading ? (
            <View
              style={{
                borderRadius: 4,
                padding: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner status="primary" size="giant" />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                marginHorizontal: 5,
                alignItems: "stretch",
              }}
            >
              <List
                data={response.data}
                {...prop}
                renderItem={renderItem}
                onRefresh={refreshData}
                refreshing={refreshing}
              />
            </View>
          )}
        </Layout>
      </Screen>
    </>
  );
};

export default AllLoadsScreen;

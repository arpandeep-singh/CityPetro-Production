import React, { useEffect, useState } from "react";
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Layout,
  List,
  ListItem,
  Card,
  Button,
} from "@ui-kitten/components";
import AppText from "../components/AppText";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import scheduleApi from "../api/schedule";
import Screen from "../components/Screen";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function formatDateString(date) {
  var newDate = new Date(date);
  return date ? `${weekDay[newDate.getDay()]} ${dateHeadline(date)}` : "";
}

function dateHeadline(tDate) {
  var date = new Date(tDate);
  return tDate
    ? `${date.getDate()} ${months[date.getMonth() - 1]} '${date
        .getFullYear()
        .toString()
        .slice(-2)}`
    : "";
}

const ScheduleScreen = (prop) => {
  const [data, setData] = React.useState([]);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    setLoading(true);
    refreshData();
    setLoading(false);
  };

  const refreshData = async () => {
    const response = await scheduleApi.getSchedule();
    setError(!response.ok);
    setData(response.data?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity disabled={true}>
      <Layout
        level="2"
        style={{
          marginVertical: "1%",
          marginHorizontal: "0.05%",
          borderRadius: 5,
          padding: "4%",
          //minHeight: "8%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppText category="s1">{formatDateString(item?.date)}</AppText>

          <View style={{ flexDirection: "row" }}>
            <Button
              size="tiny"
              appearance="outline"
              status="warning"
              //disabled={true}
            >
              {item?.details?.shift}
            </Button>
          </View>
        </View>

        <AppText category="p2" appearance="hint">
          {`${item?.details?.truck} , ${item?.details?.trailer}`}
        </AppText>
        <AppText category="p2" appearance="hint">
          {`${item?.name}`}
        </AppText>
      </Layout>
    </TouchableOpacity>
  );

  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              {...prop}
              alignment="start"
              title="Bi-Weekly Schedule"
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

          <View style={{ flex: 1, marginHorizontal: 10, paddingTop: 10 }}>
            {loading && <AppText>Loading...</AppText>}
            {!loading && (
              <>
                <Layout level="2" style={{ padding: "3%", marginBottom: "3%" }}>
                  <AppText category="h5" style={{ textAlign: "center" }}>
                    {dateHeadline(data?.fromDate) ?? ""}
                    <AppText
                      category="s1"
                      style={{ textAlign: "center" }}
                      appearance="hint"
                    >
                      {" To "}
                    </AppText>
                    {dateHeadline(data?.toDate) ?? ""}
                  </AppText>
                  <AppText
                    category="s1"
                    style={{ textAlign: "center" }}
                    appearance="hint"
                  >
                    Published:{" "}
                    {new Date(data?.dateCreated).toLocaleString() ?? ""}
                  </AppText>
                </Layout>
                <List
                  data={data?.shifts}
                  {...prop}
                  renderItem={renderItem}
                  refreshing={refreshing}
                  onRefresh={refreshData}
                />
              </>
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
});

export default ScheduleScreen;

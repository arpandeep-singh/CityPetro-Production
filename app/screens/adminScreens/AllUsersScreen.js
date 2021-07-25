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
} from "@ui-kitten/components";
import AppText from "../../components/AppText";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import adminApi from "../../api/admin";
import Screen from "../../components/Screen";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const PlusIcon = (props) => <Icon {...props} name="plus" />;

const AllUsersScreen = (prop) => {
  const routeOptions = prop.route.params;
  const [users, setUsers] = React.useState([]);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    setLoading(true);
    await refreshData();
    setLoading(false);
  };

  const refreshData = async () => {
    const response = await adminApi.getUsers();
    setError(!response.ok);
    setUsers(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const renderUserItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      activeOpacity={0.7}
      onPress={() =>
        prop.navigation.navigate(routeOptions.nextScreen, { user: item })
      }
    >
      <Layout
        level="1"
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
          <AppText category="s1">{item?.name} </AppText>

          <View style={{ flexDirection: "row" }}>
            <Button size="tiny" appearance="outline" status="primary">
              Level {item?.level ?? "N"}
            </Button>
          </View>
        </View>

        <AppText category="p2" appearance="hint">
          {item?.email}
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
              title="All Users"
              accessoryRight={() => (
                <TopNavigationAction
                  icon={PlusIcon}
                  onPress={() => {
                    prop.navigation.navigate("CreateUser");
                  }}
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
          <View style={{ flex: 1, marginHorizontal: 10, paddingTop: 10 }}>
            {loading && (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <AppText appearance="hint">Loading...</AppText>
              </View>
            )}
            <SafeAreaView style={{ flex: 1 }}>
              <Layout level="1" style={{ flex: 1 }}>
                <List
                  data={users}
                  {...prop}
                  renderItem={renderUserItem}
                  refreshing={refreshing}
                  onRefresh={refreshData}
                  style={{ paddingBottom: "10%" }}
                />
              </Layout>
            </SafeAreaView>
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

export default AllUsersScreen;

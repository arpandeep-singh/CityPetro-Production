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
import adminApi from "../../api/admin";
import Screen from "../../components/Screen";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const PlusIcon = (props) => <Icon {...props} name="plus" />;
const SearchIcon = (props) => <Icon {...props} name="search" />;

const AllCitiesScreen = (prop) => {
  const theme = useTheme();
  // const routeParams = prop.route.params;
  //const city = routeParams.city;
  const [filteredData, setFilteredData] = React.useState([]);
  const [masterData, setMasterData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const refreshData = async () => {
    const response = await adminApi.getCities();
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
      masterData.filter(({ name }) =>
        name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const renderListItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => prop.navigation.navigate("CityInfo", { city: item })}
    >
      <View
        style={{
          borderRadius: 5,
          padding: "5%",
          minHeight: "8%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AppText category="s1">{item?.name}</AppText>
          <AppText category="p2" appearance="hint">
            {item?.stations?.length ?? "NA"}
            {" Stations"}
          </AppText>
        </View>
      </View>
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
              title={`All Cities`}
              accessoryRight={() => (
                <TopNavigationAction
                  icon={PlusIcon}
                  onPress={() => {
                    prop.navigation.navigate("CreateCity");
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
          <View style={{ flex: 1, paddingTop: 10 }}>
            <Layout
              style={{
                //backgroundColor: theme["color-primary-default"],
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

export default AllCitiesScreen;

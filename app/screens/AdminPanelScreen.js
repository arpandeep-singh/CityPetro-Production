import React from "react";
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
import Screen from "../components/Screen";

const features = [
  {
    name: "Manage Users",
    description: "Create | Edit | Delete",
    screen: "AllUsers",
    params: {
      nextScreen: "UserInfo",
    },
  },
  {
    name: "City-Terminal Rates",
    description: "Create | Edit | Delete",
    screen: "AllCities",
  },
  {
    name: "Site Maps",
    description: "Create | Edit | Delete",
    screen: "AllFoldersAdmin",
    params: {
      category: "SiteMap",
    },
  },
  {
    name: "Dip Charts",
    description: "Create | Edit | Delete",
    screen: "AllFoldersAdmin",
    params: {
      category: "DipChart",
    },
  },
];

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const AdminPanelScreen = (prop) => {
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => prop.navigation.navigate(item.screen, item.params ?? {})}
    >
      <Layout
        level="1"
        style={{
          marginVertical: "1%",
          marginHorizontal: "1%",
          borderRadius: 5,
          padding: 20,
          minHeight: "8%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppText category="s1">{item.name} </AppText>

          <View style={{ flexDirection: "row" }}>
            {/* <Button
              size="tiny"
              appearance="outline"
              status="danger"
              disabled={true}
            >
              Driver-A
            </Button> */}
          </View>
        </View>

        <AppText category="p2" appearance="hint">
          {item.description}
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
              title="All Invoices"
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
            <List data={features} {...prop} renderItem={renderItem} />
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

export default AdminPanelScreen;

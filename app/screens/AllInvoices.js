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
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";

const invoices = [
  { period: "May 1 - May 15", name: "2733736.pdf" },
  { period: "May 1 - May 15", name: "2733736.pdf" },
  { period: "May 1 - May 15", name: "2733736.pdf" },
  { period: "May 1 - May 15", name: "2733736.pdf" },
  { period: "May 1 - May 15", name: "2733736.pdf" },
];

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const AllInvoicesScreen = (prop) => {
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => prop.navigation.navigate(item.screen)}
    >
      <Layout
        level="1"
        style={{
          marginVertical: "1%",
          marginHorizontal: "0.05%",
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
          <AppText category="s1">$4,600.89 </AppText>

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
          05/Apr/21 - 30/Apr/21
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
            <List data={invoices} {...prop} renderItem={renderItem} />
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

export default AllInvoicesScreen;

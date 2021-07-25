import React from "react";
import {
  Button,
  Icon,
  List,
  ListItem,
  Layout,
  Divider,
  TopNavigation,
  TopNavigationAction,
  Spinner,
} from "@ui-kitten/components";
import AppText from "../components/AppText";
import { SafeAreaView, StyleSheet, View } from "react-native";
import sitesApi from "../api/sites";
import { useEffect, useState } from "react";

function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(2) + "K"
    : Math.sign(num) * Math.abs(num);
}

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const renderItemIcon = (props) => <Icon {...props} name="file-text" />;

const AllInvoices = (prop) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSite();
    prop.navigation.addListener("focus", () => {
      loadSite();
    });
  }, []);

  const loadSite = async () => {
    const response = await sitesApi.getSiteDetail(prop.route.params.site._id);
    setData(response.data.data);
  };

  const renderItem = ({ item }) => (
    <ListItem
      {...prop}
      title={<AppText>${`${item.amount}`}</AppText>}
      description={`${item.createAt}`}
      accessoryLeft={renderItemIcon}
      onPress={() => {
        console.log(item.file);
        prop.navigation.navigate("PdfScreen", { filePath: item.file });
      }}
    />
  );

  return (
    <>
      <TopNavigation
        alignment="start"
        {...prop}
        title={(evaProps) => (
          <AppText category="h6" status="primary">
            CREATE INVOICE
          </AppText>
        )}
        subtitle={data.customerName ?? "..."}
        accessoryLeft={(props) => (
          <TopNavigationAction
            icon={BackIcon}
            onPress={() => prop.navigation.goBack()}
          />
        )}
      />
      <Divider />
      <Layout
        level="1"
        style={{
          padding: 20,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <AppText category="s2">Total Pending</AppText>

          <AppText category="h1">
            ${kFormatter(data.totalCost + data.tax - data.paidAmount)}
          </AppText>
        </View>
        <View style={{ justifyContent: "center" }}>
          <AppText category="s2" style={{ textAlign: "right" }}>
            Total Cost
          </AppText>

          <AppText
            category="h1"
            appearance="hint"
            style={{ textAlign: "right" }}
          >
            ${kFormatter(data.totalCost + data.tax) ?? "00"}
          </AppText>
        </View>
      </Layout>

      <Divider />
      <List
        {...prop}
        style={styles.container}
        data={data.invoices}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={loadSite}
      />

      <Layout style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <Button
          style={styles.button}
          appearance="filled"
          {...prop}
          onPress={() =>
            prop.navigation.navigate("CreateNewInvoice", { site: data })
          }
        >
          ADD PAYMENT
        </Button>
      </Layout>
    </>
  );
};

export default InvoicesScreen = (prop) => {
  // const [data, setData] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   loadSite();
  // }, []);

  // const loadSite = async () => {
  //   const response = await sitesApi.getSiteDetail(prop.route.params.site._id);
  //   setData(response.data.data);
  // };

  return (
    <>
      <Layout level="1" style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <AllInvoices {...prop} />
          {/* <List
            {...prop}
            style={styles.container}
            data={data.invoices}
            renderItem={(item) => renderItem(item, prop)}
            refreshing={refreshing}
            onRefresh={loadSite}
          />

          <Layout style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
            <Button
              style={styles.button}
              appearance="filled"
              {...prop}
              onPress={() =>
                prop.navigation.navigate("CreateNewInvoice", { site: data })
              }
            >
              ADD PAYMENT
            </Button>
          </Layout> */}
        </SafeAreaView>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

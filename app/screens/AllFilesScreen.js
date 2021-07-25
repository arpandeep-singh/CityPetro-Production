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
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Divider,
  Alert,
  Platform,
} from "react-native";
import docsApi from "../api/shiftDocs";
import Screen from "../components/Screen";
import * as OpenAnything from "react-native-openanything";
import AppText from "../components/AppText";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const PlusIcon = (props) => <Icon {...props} name="plus" />;
const SearchIcon = (props) => <Icon {...props} name="search" />;
const renderItemIcon = (props) => (
  <View style={{ flexDirection: "row" }}>
    <Icon {...props} name="file-text" />
  </View>
);

const AllFilesScreen = (prop) => {
  const theme = useTheme();
  const folder = prop.route.params.folder;

  const [filteredData, setFilteredData] = React.useState([]);
  const [masterData, setMasterData] = React.useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const refreshData = async (...args) => {
    const response = await docsApi.getShiftDocs(...args);
    setError(!response.ok);
    setFilteredData(response.data.data);
    setMasterData(response.data.data);
  };

  const getData = async (...args) => {
    setLoading(true);
    refreshData(...args);
    setLoading(false);
  };

  useEffect(() => {
    getData({ folder: folder });
  }, []);

  const searchFilter = (text) => {
    setFilteredData(
      masterData.filter(({ fileName }) =>
        fileName.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const renderListItem = ({ item, index }) => (
    <ListItem
      {...prop}
      style={{
        paddingRight: 15,
        marginBottom: 5,
      }}
      accessoryLeft={renderItemIcon}
      title={`${item.fileName}`}
      description={`${item.link}`}
      onPress={() => {
        if (Platform.OS == "android") {
          OpenAnything.Pdf(item.link);
        } else if (Platform.OS == "ios") {
          prop.navigation.navigate("PdfScreen", { url: item.link });
        }
      }}
    />
  );

  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              {...prop}
              alignment="start"
              title={`All Files`}
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
              level="1"
              style={{
                //backgroundColor: theme["color-primary-default"],
                padding: "4%",
                marginBottom: 10,
                borderRadius: 5,
                marginHorizontal: "2%",
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

export default AllFilesScreen;

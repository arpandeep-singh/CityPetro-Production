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
import shiftDocsApi from "../../api//shiftDocs";
import { Formik } from "formik";
import * as Yup from "yup";
import AppFormField from "../../components/AppFormField";
import SubmitButton from "../../components/SubmitButton";
import Screen from "../../components/Screen";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const PlusIcon = (props) => <Icon {...props} name="plus" />;
const SearchIcon = (props) => <Icon {...props} name="search" />;

const validationSchema = Yup.object().shape({
  name: Yup.string().label("Name"),
});

const AllFolders_Admin = (prop) => {
  const theme = useTheme();
  const category = prop.route.params.category;

  const [Data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const refreshData = async () => {
    const response = await shiftDocsApi.getShiftDocFolders({
      category: category,
    });
    setData(response.data.data);
  };
  const getData = async () => {
    setLoading(true);
    await refreshData();
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (data) => {
    const result = await shiftDocsApi.createFolder({
      ...data,
      category: category,
    });
    if (!result.ok) {
      return Alert.alert(result.data.error);
    }
    const newFolder = result.data.data;
    setData([...Data, newFolder]);
    Alert.alert("Created Successfully!");
  };

  const renderListItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => prop.navigation.navigate("FolderInfo", { folder: item })}
    >
      <View
        style={{
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
          {/* <AppText category="p2" appearance="hint">
            {item?.stations?.length ?? "NA"}
            {" Stations"}
          </AppText> */}
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
              title={`All Folders for ${category}`}
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
                // backgroundColor: theme["color-primary-default"],
                padding: "4%",
                marginBottom: 10,
                margin: "2%",
                borderRadius: 5,
              }}
            >
              <AppText category="h6" appearance="hint" status="control">
                Add a new folder
              </AppText>
              <Formik
                initialValues={{ name: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {() => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AppFormField name="name" style={{ flex: 1 }} />
                    <SubmitButton
                      title="ADD"
                      style={{ marginLeft: "4%" }}
                      appearance="ghost"
                    />
                    {/* <Input
                    status="primary"
                    style={{ marginTop: "3%" }}
                    accessoryRight={SearchIcon}
                    onChangeText={searchFilter}
                  /> */}
                  </View>
                )}
              </Formik>
            </Layout>
            {loading && (
              <View style={{ alignContent: "center", alignItems: "center" }}>
                <AppText appearance="hint">Loading...</AppText>
              </View>
            )}
            {!loading && Data.length == 0 && (
              <View style={{ alignContent: "center", alignItems: "center" }}>
                <AppText appearance="hint">No Data</AppText>
              </View>
            )}
            {!loading && (
              <List
                data={Data}
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
  },
  footerControl: {
    marginHorizontal: 2,
  },
  input: {
    marginVertical: 5,
    flex: 1,
  },
});

export default AllFolders_Admin;

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
  IconRegistry,
  Spinner,
  OverflowMenu,
  MenuItem,
} from "@ui-kitten/components";
import AppText from "../components/AppText";
import { Alert, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native";
import loadsApi from "../api/loads";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const EditIcon = (props) => <Icon {...props} name="edit" />;
const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;
const RefreshIcon = (props) => <Icon {...props} name="refresh" />;
const DeleteIcon = (props) => <Icon {...props} name="trash" />;
import Screen from "../components/Screen";

const DetailItem = ({ label, value }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 5,
    }}
  >
    <AppText category="p1">{label}</AppText>
    <AppText>{value}</AppText>
  </View>
);

const LoadDetailScreen = (prop) => {
  const theme = useTheme();
  const loadId = prop.route.params.id;

  const auth = useAuth();

  //.data due to data field in response
  let intitial = {
    stationID: "",
    city: "",
    waitingCharge: "",
    waitingTime: "",
    terminal: "",
    splits: "",
    comments: "",
    terminalRate: "",
    waitingCharge: "",
    paperwork: [],
    totalRate: "",
    date: "",
  };

  const [load, setData] = useState(intitial);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async (...args) => {
    setLoading(true);
    const response = await loadsApi.getLoadDetail(...args);
    setError(!response.ok);
    setData(response.data.data);
    setLoading(false);
  };

  const refreshData = async () => {
    const response = await loadsApi.getLoadDetail(loadId);
    if (!response.ok) {
      Alert.alert("Something went wrong!");
    }
    setData(response.data.data);
    Alert.alert("Refreshed!");
  };

  const handleDelete = async () => {
    if (auth.isAdmin()) {
      const response = await loadsApi.deleteLoad(loadId);
      if (!response.ok) {
        Alert.alert("Something went wrong!");
      }
      setData(response.data.data);

      Alert.alert("Deleted Successfully!");
      prop.navigation.goBack();
    }
  };

  useEffect(() => {
    getData(loadId);
  }, []);

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={RefreshIcon} onPress={refreshData} />
      {auth.isAdmin() && (
        <OverflowMenu
          anchor={renderMenuAction}
          visible={menuVisible}
          onBackdropPress={toggleMenu}
        >
          <MenuItem
            accessoryLeft={EditIcon}
            title="Edit"
            onPress={() => {
              toggleMenu();
              return prop.navigation.navigate("EditLoad", { load: load });
            }}
          />
          <MenuItem
            accessoryLeft={DeleteIcon}
            title="Delete"
            onPress={() => {
              toggleMenu();
              handleDelete();
            }}
          />
        </OverflowMenu>
      )}
    </React.Fragment>
  );

  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              alignment="center"
              title="Load Detail"
              accessoryLeft={() => (
                <TopNavigationAction
                  icon={BackIcon}
                  onPress={() => {
                    prop.navigation.goBack();
                  }}
                />
              )}
              accessoryRight={renderRightActions}
            />
          </SafeAreaView>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <AppText appearance="hint" category="p1">
                Loading...
              </AppText>
            </View>
          ) : (
            <ScrollView style={{ flex: 1 }}>
              <Layout
                level="1"
                style={{
                  //flex: 1,
                  padding: 10,
                  marginTop: "4%",
                  marginHorizontal: "2%",
                  borderRadius: 10,
                  alignItems: "stretch",
                }}
              >
                <View style={{ minHeight: "25%" }}>
                  <View
                    style={{
                      margin: 5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AppText category="p1" appearance="hint">
                      #{loadId}
                    </AppText>
                    <Button appearance="ghost" size="tiny" status="primary">
                      COPY
                    </Button>
                  </View>
                  <Divider style={{ margin: 5 }} />
                  <View style={{ margin: 5 }}>
                    <AppText category="h6" style={{ marginBottom: 5 }}>
                      Summary
                    </AppText>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 5,
                      }}
                    >
                      <AppText category="p1">Date</AppText>
                      <AppText>
                        {load?.date
                          ? new Date(load?.date).toLocaleDateString()
                          : ""}
                      </AppText>
                    </View>
                    <DetailItem
                      label="Station Id"
                      value={load?.stationID ?? "N.A"}
                    />
                    <DetailItem label="City" value={load?.city ?? "N.A"} />
                    <DetailItem
                      label="Terminal"
                      value={load?.terminal ?? "N.A"}
                    />
                    <DetailItem label="Splits" value={load?.splits ?? "N.A"} />
                    <DetailItem
                      label="Waiting Time"
                      value={load?.waitingTime ?? "N.A"}
                    />
                    <DetailItem
                      label="Comments"
                      value={load?.comments ?? "N.A"}
                    />
                  </View>
                  <Divider style={{ margin: 5 }} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 5,
                    }}
                  >
                    <AppText category="p1">UPT Status</AppText>
                    <View style={{ flexDirection: "row" }}>
                      <Button
                        size="tiny"
                        appearance="outline"
                        status={
                          load?.uptUploadStatus == "FAILED"
                            ? "danger"
                            : load?.uptUploadStatus == "SENT"
                            ? "success"
                            : "warning"
                        }
                      >
                        {load?.uptUploadStatus ?? "NO DATA"}
                      </Button>
                    </View>
                  </View>
                  <Divider style={{ margin: 5 }} />
                  <View style={{ margin: 5 }}>
                    <AppText category="h6" style={{ marginBottom: 5 }}>
                      Paperwork
                    </AppText>
                    <View
                      style={{
                        minHeight: 50,
                        borderRadius: 5,
                        backgroundColor: "transparent",
                        //  backgroundColor: theme["background-basic-color-3"],
                      }}
                    >
                      <ListItem
                        title={`${
                          load?.paperwork?.length ?? 0
                        } documents uploaded`}
                        style={{
                          backgroundColor: theme["background-basic-color-3"],
                          borderRadius: 5,
                        }}
                        // accessoryRight={() => <Icon name="file-text" />}
                      />
                    </View>
                  </View>
                  <Divider style={{ margin: 5 }} />
                  <View style={{ margin: 5 }}>
                    <AppText category="h6" style={{ marginBottom: 5 }}>
                      Trip Earnings
                    </AppText>
                    <DetailItem
                      label="Terminal Rate"
                      value={`$${load?.terminalRate ?? 0}`}
                    />
                    {load?.splits != 0 && (
                      <DetailItem
                        label="Split Charges"
                        value={`$${load?.splitCharge ?? 0}`}
                      />
                    )}
                    {load?.waitingTime != 0 && (
                      <DetailItem
                        label="Waiting Cost"
                        value={`$${load?.waitingCharge ?? 0}`}
                      />
                    )}

                    <DetailItem label="HST" value={`$${load?.HST ?? 0}`} />
                    <DetailItem
                      label="Total Pay"
                      value={`$${load?.totalWithHST ?? 0}`}
                    />
                  </View>
                </View>
              </Layout>
            </ScrollView>
          )}
        </Layout>
      </Screen>
    </>
  );
};

export default LoadDetailScreen;

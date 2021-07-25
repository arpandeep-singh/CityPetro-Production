import React from "react";
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Layout,
  useTheme,
  Button,
  List,
} from "@ui-kitten/components";
import { SafeAreaView, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import AppText from "../components/AppText";

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;
const listMenuItems = [
  { name: "SUBMIT DAILY REPORT", screen: "NewLoad" },
  { name: "SCHEDULE", screen: "Schedule" },
  { name: "INVOICES", screen: "AllInvoices" },
];

const adminListMenuItems = [
  ...listMenuItems,
  { name: "ADMIN PANEL", screen: "AdminPanel" },
];

const DashboardScreen = (prop) => {
  const theme = useTheme();
  const auth = useAuth();

  const GetListItemsBasesOnRole = () => {
    return auth?.isAdmin() ? adminListMenuItems : listMenuItems;
  };

  const handleReportsNav = () => {
    if (auth.isAdmin()) {
      return prop.navigation.navigate("AllUsers", { nextScreen: "AllLoads" });
    }
    return prop.navigation.navigate("AllLoads");
  };

  const renderLogoutAction = () => (
    <TopNavigationAction icon={LogoutIcon} onPress={auth.logout} />
  );

  const renderListMenuItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        prop.navigation.navigate(item.screen);
      }}
    >
      <Layout
        level="1"
        style={{
          marginHorizontal: "5%",
          marginVertical: "3%",
          borderRadius: 5,
          padding: "5%",
          minHeight: "8%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppText category="h6" appearance="hint">
            {item.name}
          </AppText>
          {/* <Button size="tiny" appearance="outline">
            VIEW
          </Button> */}
        </View>
      </Layout>
    </TouchableOpacity>
  );

  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <View style={{ height: "40%" }}>
            <View
              style={{
                height: "70%",
                padding: "3%",
                backgroundColor: theme["color-primary-default"],
              }}
            >
              {/* <Image
                source={require("../assets/images/truck.jpg")}
                style={{
                  position: "absolute",
                  //height: "100%",
                  //flex: 1,
                  height: "111%",
                  resizeMode: "center",
                  width: "120%",
                  opacity: 0.5,
                }}
              /> */}
              <SafeAreaView>
                <TopNavigation
                  style={{
                    marginHorizontal: -10,
                    padding: 10,
                    marginBottom: 5,
                    backgroundColor: "transparent",
                  }}
                  alignment="start"
                  accessoryRight={renderLogoutAction}
                  title={(evaProps) => (
                    <AppText category="h5" status="control">
                      CITY PETRO
                    </AppText>
                  )}
                />
              </SafeAreaView>
              <View style={{}}>
                <AppText category="h3" status="control">
                  Hello , {auth.user.name}!
                </AppText>
              </View>
            </View>
            <View
              style={{
                //backgroundColor: "yellow",
                //opacity: 0.5,
                width: "100%",
                height: "50%",
                flex: 1,
                paddingHorizontal: "1%",
                alignSelf: "center",
                position: "absolute",
                //left: 100,
                top: "50%",

                flexDirection: "row",

                //right: 100,
              }}
            >
              <Layout
                level="1"
                style={{
                  //backgroundColor: "white",
                  borderRadius: 10,
                  flex: 1,
                  margin: "1%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    prop.navigation.navigate("AllFolders", {
                      category: "SiteMap",
                    });
                  }}
                >
                  {/* <AppText category="s1" status="primary">
                  Site Maps
                </AppText> */}
                  <AppText category="h6" appearance="hint">
                    Site Maps
                  </AppText>
                </TouchableOpacity>
              </Layout>
              <Layout
                level="1"
                style={{
                  borderRadius: 10,
                  flex: 1,
                  margin: "1%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    prop.navigation.navigate("AllFolders", {
                      category: "DipChart",
                    });
                  }}
                >
                  <AppText category="h6" appearance="hint">
                    Dip Charts
                  </AppText>
                </TouchableOpacity>
              </Layout>
              <Layout
                level="1"
                style={{
                  borderRadius: 10,
                  flex: 1,
                  margin: "1%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                  onPress={handleReportsNav}
                >
                  <AppText category="h6" appearance="hint">
                    Reports
                  </AppText>
                </TouchableOpacity>
              </Layout>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 15 }}>
            <List
              bounces={false}
              data={GetListItemsBasesOnRole()}
              {...prop}
              renderItem={renderListMenuItem}
            />
          </View>

          {/* <SafeAreaView style={{ justifyContent: "flex-end" }}>
            <View>
              <Button
                size="large"
                appearance="ghost"
                status="primary"
                onPress={() => {
                  prop.navigation.navigate("NewLoad");
                }}
              >
                ADD A NEW LOAD
              </Button>
            </View>
          </SafeAreaView> */}
        </Layout>
      </Screen>
    </>
  );
};

export default DashboardScreen;

import React from "react";
import {
  TopNavigation,
  Text,
  TopNavigationAction,
  Icon,
  Layout,
  useTheme,
  Button,
} from "@ui-kitten/components";
import { SafeAreaView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAuth from "../auth/useAuth";

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

const DashboardScreen = (prop) => {
  const theme = useTheme();
  const auth = useAuth();

  const renderLogoutAction = () => (
    <TopNavigationAction icon={LogoutIcon} onPress={auth.logout} />
  );

  return (
    <>
      <Layout level="2" style={{ flex: 1, padding: 10 }}>
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
              <Text category="h6" status="primary">
                CITY PETRO
              </Text>
            )}
          />
        </SafeAreaView>

        <View style={{ height: "5%" }}>
          <Text category="h3">Hello , {auth.user.name}!</Text>
        </View>
        <View style={{ height: "3%" }}></View>
        <View style={{ height: "25%" }}>
          <Text category="s2" appearance="hint">
            What can we help with?
          </Text>
          <View style={{ flexDirection: "row", flex: 1, marginVertical: "1%" }}>
            <View
              style={{
                flex: 1,
                margin: "1%",
                backgroundColor: theme["color-primary-default"],
                borderRadius: 10,
                shadowOffset: {
                  width: 1,
                  height: 4,
                },
                shadowColor: "grey",
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  prop.navigation.navigate("AllFolders", {
                    category: "SiteMap",
                  });
                }}
                activeOpacity={0.5}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text category="s1" status="control">
                    Site Maps
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                margin: "1%",
                backgroundColor: theme["color-primary-default"],
                borderRadius: 10,
                shadowOffset: {
                  width: 1,
                  height: 4,
                },
                shadowColor: "grey",
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  prop.navigation.navigate("AllFolders", {
                    category: "DipChart",
                  });
                }}
                activeOpacity={0.5}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <View
                  style={{
                    flex: 1,

                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text category="s1" status="control">
                    Dip Charts
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                margin: "1%",
                backgroundColor: theme["color-primary-default"],
                borderRadius: 10,
                shadowOffset: {
                  width: 1,
                  height: 4,
                },
                shadowColor: "grey",
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                onPress={() => {
                  prop.navigation.navigate("AllLoads");
                }}
              >
                <View
                  style={{
                    flex: 1,

                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text category="s1" status="control">
                    Reports
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ height: "3%" }}></View>
        <View style={{}}>
          <Text category="s2" appearance="hint">
            Schedule Board
          </Text>
          <View
            style={{
              backgroundColor: "white",
              margin: "1%",
              borderRadius: 10,
              padding: 10,
              minHeight: "8%",
              shadowOffset: {
                width: 1,
                height: 4,
              },
              shadowColor: "grey",
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text category="s1">1 May - 15 May </Text>
              <Button size="tiny" appearance="outline">
                VIEW
              </Button>
            </View>

            <Text category="p2" appearance="hint">
              Updated 2 days ago
            </Text>
          </View>
        </View>
        <View style={{ height: "3%" }}></View>
        <View style={{ flex: 1 }}>
          <Text category="s2" appearance="hint">
            Invoices Panel
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              prop.navigation.navigate("AllInvoices");
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                margin: "1%",
                borderRadius: 10,
                padding: 10,
                minHeight: "8%",
                shadowOffset: {
                  width: 1,
                  height: 4,
                },
                shadowColor: "grey",
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text category="s1">Singh_Arpandeep.pdf </Text>
                <Button size="tiny" appearance="outline">
                  VIEW
                </Button>
              </View>

              <Text category="p2" appearance="hint">
                Issued 4 days ago
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <SafeAreaView>
          <View>
            <Button
              size="large"
              appearance="outline"
              status="primary"
              onPress={() => {
                prop.navigation.navigate("NewLoad");
              }}
            >
              ADD A NEW LOAD
            </Button>
          </View>
        </SafeAreaView>
      </Layout>
    </>
  );
};

export default DashboardScreen;

import React, { useEffect } from "react";
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Layout,
  List,
  ListItem,
  useTheme,
  Spinner,
} from "@ui-kitten/components";
import AppText from "../components/AppText";
import {
  SafeAreaView,
  View,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import Screen from "../components/Screen";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import useApi from "../hooks/useApi";
import docsApi from "../api/shiftDocs";
import { TouchableOpacity } from "react-native-gesture-handler";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const renderItemIcon = (props) => (
  <View style={{ flexDirection: "row" }}>
    <Icon {...props} name="file-text" />
  </View>
);

const numColumns = 3;
const WIDTH = Dimensions.get("window").width;
const AllFoldersScreen = (prop) => {
  const category = prop.route.params.category;

  const getDocsApi = useApi(docsApi.getShiftDocFolders);

  let data = [];

  if (!getDocsApi.error) {
    data = getDocsApi.data.data;
  }

  useEffect(() => {
    getDocsApi.request({ category: category });
  }, []);

  const theme = useTheme();

  const formatData = (dataList, numColumns) => {
    if (dataList != undefined) {
      const totalRows = Math.floor(dataList.length / numColumns);
      let totalLastRow = dataList.length - totalRows * numColumns;

      while (totalLastRow !== 0 && totalLastRow !== numColumns) {
        dataList.push({ name: "blank", empty: true });
        totalLastRow++;
      }
    }

    return dataList;
  };

  const renderItem = ({ item, index }) => {
    if (item.empty) {
      return <View style={[styles.gridItem, styles.gridItemInvisible]} />;
    }
    return (
      <View
        style={[
          styles.gridItem,
          { backgroundColor: theme["color-basic-transparent-100"] },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            prop.navigation.navigate("AllFiles", { folder: item._id })
          }
        >
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                color={theme["color-primary-default"]}
                name="folder"
                size={60}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppText category="p1">{item.name}</AppText>
            </View>
          </>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Screen>
        <Layout level="2" style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              {...prop}
              alignment="start"
              title={category + "s"}
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
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              paddingTop: 10,
              flex: 1,
            }}
          >
            {getDocsApi?.loading && (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <AppText category="p1" appearance="hint">
                  Loading...
                </AppText>
              </View>
            )}
            {!getDocsApi?.loading && (
              <>
                {data?.length == 0 && (
                  <AppText
                    category="p1"
                    appearance="hint"
                    style={{ textAlign: "center" }}
                  >
                    No data
                  </AppText>
                )}
                <FlatList
                  data={formatData(data, numColumns)}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                  numColumns={numColumns}
                />
              </>
            )}
          </View>
        </Layout>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    //height: (WIDTH / numColumns),
    flex: 1,
    margin: 5,
    borderRadius: 10,
    padding: 10,
  },

  gridItemInvisible: {
    backgroundColor: "transparent",
  },
});

export default AllFoldersScreen;

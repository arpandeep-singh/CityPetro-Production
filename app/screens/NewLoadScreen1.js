import React, { useEffect, useState } from "react";
import {
  TopNavigation,
  Icon,
  Layout,
  List,
  ListItem,
  Divider,
  useTheme,
  Input,
  Datepicker,
  Select,
  SelectItem,
  Button,
  ButtonGroup,
  //Modal,
  Card,
  IndexPath,
  TopNavigationAction,
  Radio,
  RadioGroup,
} from "@ui-kitten/components";
import AppText from "../components/AppText";
import { KeyboardAvoidingView } from "./extra/3rd-party";
import {
  SafeAreaView,
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import ImageInputList from "../components/ImageInputList";
import { TouchableOpacity } from "react-native-gesture-handler";
import stationsApi from "../api/stations";
import useApi from "../hooks/useApi";
import loadsApi from "../api/loads";
import { UploadScreen } from "../screens/UploadScreen";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";
import Screen from "../components/Screen";

const renderSearchIcon = (props) => <Icon {...props} name="search" />;

const CalendarIcon = (props) => <Icon {...props} name="calendar" />;

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const useRadioState = (initialCheck = false) => {
  const [checked, setChecked] = React.useState(initialCheck);
  return { checked, onChange: setChecked };
};

const NewLoadScreen = (props) => {
  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);
  const [filteredStations, setFilteredStations] = React.useState([]);
  const [masterStations, setMasterStations] = React.useState([]);

  let initialSite = {
    stationId: "SELECT",
    city: "N.A",
    terminalRates: {
      rateToronto: 0,
      rateHamilton: 0,
      rateOakville: 0,
      rateNanticoke: 0,
    },
  };

  const terminalMap = [
    { name: "Toronto" },
    { name: "Hamilton" },
    { name: "Oakville" },
    { name: "Nanticoke" },
  ];

  const [station, setStation] = React.useState(initialSite);
  const [rate, setRate] = useState(0);
  const [splits, setSplits] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [terminal, setTerminal] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [uptLink, setUptLink] = React.useState("");
  const [waiting, setWaiting] = React.useState(0);
  const [comments, setComments] = React.useState("");
  const [imageUris, setImageUris] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [result, setResult] = useState();

  const getData = async (...args) => {
    setLoading(true);
    const response = await stationsApi.getSites();
    setLoading(false);

    setError(!response.ok);
    setFilteredStations(response.data.data);
    setMasterStations(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearchStation = (text) => {
    setFilteredStations(
      masterStations.filter(
        ({ stationId, city }) =>
          stationId.toLowerCase().includes(text.toLowerCase()) ||
          city?.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item?.stationId}`}
      description={`${item?.city.name}`}
      onPress={() => {
        setStation(item);

        setSelectedIndex(0);
        setRate(item.terminalRates.rateToronto);

        setVisible(false);
      }}
    />
  );

  const handleAdd = (uri) => {
    setImageUris([...imageUris, uri]);
  };
  const handleRemove = (uri) => {
    setImageUris(imageUris.filter((imageuri) => imageuri !== uri));
  };

  const handleSplitPlus = () => {
    if (rate >= 0) {
      setSplits(splits + 1);
      setRate(rate + 20);
    }
  };

  const handleSplitMinus = () => {
    var afterMinus = splits - 1;
    if (afterMinus >= 0) {
      setSplits(afterMinus);
      setRate(rate - 20);
    }
  };

  const handleWaitingPlus = () => {
    if (rate >= 0) {
      setWaiting(waiting + 5);
      //setRate(rate + 20);
    }
  };

  const handleWaitingMinus = () => {
    var afterMinus = waiting - 5;
    if (afterMinus >= 0) {
      setWaiting(afterMinus);
      //setRate(rate - 20);
    }
  };

  const handeTerminalChange = (index) => {
    setSelectedIndex(index);
    setRate(Object.values(station.terminalRates)[index]);
  };

  const GetWaitingString = () => {
    var hrs = Math.floor(waiting / 60);
    var minutes = waiting;

    if (hrs < 10 || hrs == 0) {
      hrs = "0" + hrs;
    }
    var hrsMinutes = hrs * 60;
    minutes = minutes - hrsMinutes;
    if (minutes == 0) {
      minutes = "0" + minutes;
    }
    return hrs + ":" + minutes;
  };

  const SubmitForm = async () => {
    setUploadError(false);
    setProgress(0);
    setUploadVisible(true);

    const data = {
      station: station.stationId,
      city: station.city.name,
      rate: Object.values(station.terminalRates)[selectedIndex],
      waitingTime: waiting,
      comments: comments,
      terminal: Object.values(terminalMap)[selectedIndex].name,
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      images: imageUris,
      splits: splits,
      uptLink: uptLink,
    };
    const result = await loadsApi.addLoad(data, (progress) =>
      setProgress(progress)
    );
    console.log(result?.data?.data);
    setUploadError(result.ok);
    //setUploadVisible(false);
  };

  return (
    <>
      <Screen>
        <Layout level="1" style={{ flex: 1 }}>
          <Modal visible={uploadVisible}>
            <Layout level="1" style={styles.container}>
              {progress < 1 ? (
                <Progress.Bar
                  color={theme["color-primary-default"]}
                  progress={progress}
                  width={200}
                />
              ) : (
                <LottieView
                  autoPlay
                  loop={false}
                  style={styles.animation}
                  source={require("../../assets/animations/done.json")}
                  onAnimationFinish={() => setUploadVisible(false)}
                />
              )}
            </Layout>
          </Modal>
          <SafeAreaView>
            <TopNavigation
              alignment="center"
              title="Add a New Load"
              accessoryLeft={() => (
                <TopNavigationAction
                  icon={BackIcon}
                  onPress={() => {
                    props.navigation.goBack();
                  }}
                />
              )}
            />
          </SafeAreaView>
          <KeyboardAvoidingView>
            <View
              style={{
                flex: 1,
                margin: 10,
              }}
            >
              <Layout level="2" style={styles.outsideContainer}>
                <View style={styles.innerContainer}>
                  <AppText category="s1">STATION</AppText>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setVisible(true)}
                  >
                    <AppText category="h6">{station.stationId}</AppText>
                  </TouchableOpacity>
                </View>
                <View style={[styles.innerContainer, { marginVertical: 6 }]}>
                  <View>
                    <AppText category="s1">TOTAL RATE</AppText>
                    <AppText status="primary" category="h6">
                      $
                      {(
                        Object.values(station.terminalRates)[selectedIndex] +
                        splits * 20
                      ).toFixed(2)}
                    </AppText>
                  </View>
                  <View>
                    <AppText category="s1" style={{ textAlign: "right" }}>
                      CITY
                    </AppText>
                    <AppText
                      status="primary"
                      category="h6"
                      style={{ textTransform: "uppercase" }}
                    >
                      {station?.city?.name}
                    </AppText>
                  </View>
                </View>

                <View style={[styles.innerContainer, { marginTop: 5 }]}>
                  <AppText category="s1">
                    SPLIT LOADS:{" "}
                    <AppText category="s1" appearance="hint">
                      0{splits}
                    </AppText>
                  </AppText>
                  <ButtonGroup appearance="filled" status="primary" size="tiny">
                    <Button
                      onPress={handleSplitPlus}
                      disabled={station?.stationId == "SELECT"}
                    >
                      <AppText category="s1" status="control">
                        +1
                      </AppText>
                    </Button>
                    <Button
                      onPress={handleSplitMinus}
                      disabled={station?.stationId == "SELECT"}
                    >
                      <AppText category="s1" status="control">
                        -1
                      </AppText>
                    </Button>
                  </ButtonGroup>
                </View>
                <View>
                  <AppText category="s1">TERMINAL</AppText>
                  <Layout
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      padding: 10,
                      borderRadius: 5,
                      marginTop: "2%",
                    }}
                    level="1"
                  >
                    <RadioGroup
                      selectedIndex={selectedIndex}
                      style={{ flexDirection: "row", flexWrap: "wrap" }}
                      onChange={handeTerminalChange}
                    >
                      {terminalMap.map((t, index) => (
                        <Radio
                          disabled={
                            Object.values(station.terminalRates)[index] == 0
                          }
                          key={t.name}
                        >
                          {t.name}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </Layout>
                </View>
              </Layout>

              <Layout level="2" style={styles.outsideContainer}>
                <View>
                  <AppText category="s1" style={{ marginVertical: 3 }}>
                    DATE
                  </AppText>
                  <Datepicker
                    placeholder="Pick Date"
                    date={date}
                    onSelect={setDate}
                    accessoryRight={CalendarIcon}
                  />
                  <AppText category="s1" style={{ marginVertical: 3 }}>
                    UPT LINK
                  </AppText>
                  <Input returnKeyType="next" onChangeText={setUptLink} />
                </View>
              </Layout>
              <Layout level="2" style={styles.outsideContainer}>
                <View style={styles.innerContainer}>
                  <AppText category="s1" style={{ marginVertical: 3 }}>
                    WAITING{"  "}
                    <AppText appearance="hint" style={{}}>
                      {GetWaitingString()} Hours
                    </AppText>
                  </AppText>
                  <ButtonGroup appearance="filled" status="primary" size="tiny">
                    <Button
                      onPress={handleWaitingPlus}
                      disabled={station.stationId == "SELECT"}
                    >
                      <AppText category="s1" status="control">
                        +5
                      </AppText>
                    </Button>
                    <Button
                      onPress={handleWaitingMinus}
                      disabled={station.stationId == "SELECT"}
                    >
                      <AppText category="s1" status="control">
                        -5
                      </AppText>
                    </Button>
                  </ButtonGroup>
                </View>
                <AppText
                  appearance="hint"
                  style={{ fontStyle: "italic", marginTop: 10 }}
                >
                  (Note: Waiting time is counted past 1 hr)
                </AppText>
              </Layout>
              <Layout level="2" style={styles.outsideContainer}>
                <View>
                  <AppText category="s1" style={{ marginBottom: 3 }}>
                    COMMENTS
                  </AppText>
                  <Input returnKeyType="next" onChangeText={setComments} />
                </View>
              </Layout>
              <Layout level="2" style={styles.outsideContainer}>
                <View>
                  <AppText category="s1" style={{ marginBottom: 3 }}>
                    PAPER WORK
                  </AppText>
                  <ImageInputList
                    imageUris={imageUris}
                    onAddImage={handleAdd}
                    onRemoveImage={handleRemove}
                  />
                </View>
                <View style={[styles.innerContainer, { marginTop: 10 }]}>
                  <View style={{ flex: 1, width: "49%", margin: "1%" }}>
                    <Button onPress={SubmitForm}>SUBMIT</Button>
                  </View>
                  <View style={{ flex: 1, width: "49%", margin: "1%" }}>
                    <Button
                      appearance="outline"
                      onPress={() => {
                        props.navigation.goBack();
                      }}
                    >
                      CANCEL
                    </Button>
                  </View>
                </View>
              </Layout>
            </View>
          </KeyboardAvoidingView>
        </Layout>
      </Screen>
      <SafeAreaView>
        <Modal visible={visible} animationType="slide">
          <Layout level="2" style={{ flex: 1 }}>
            <SafeAreaView
              style={{
                margin: 10,
                paddingTop: 20,
                flex: 1,
                flexDirection: "column",
              }}
            >
              <AppText category="s1">STATION ID</AppText>
              <Input
                status="primary"
                style={{ marginTop: "3%" }}
                accessoryRight={renderSearchIcon}
                placeholder="Search..."
                onChangeText={(text) => handleSearchStation(text)}
              />
              <Layout level="2" style={{ flex: 1, marginVertical: "2%" }}>
                <List
                  data={filteredStations}
                  // style={{ backgroundColor: "white" }}
                  renderItem={renderItem}
                  ItemSeparatorComponent={() => <Divider />}
                />
              </Layout>
              <Button
                appearance="ghost"
                status="primary"
                onPress={() => setVisible(false)}
              >
                CLOSE
              </Button>
            </SafeAreaView>
          </Layout>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  outsideContainer: {
    marginBottom: 10,
    //backgroundColor: "white",
    margin: 5,
    padding: 15,
    borderColor: "lightgrey",
    //borderWidth: 1,
    borderRadius: 10,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  animation: {
    width: 150,
  },
});

export default NewLoadScreen;

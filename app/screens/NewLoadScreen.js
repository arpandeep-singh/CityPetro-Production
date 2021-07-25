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
  Modal,
  Card,
  IndexPath,
  TopNavigationAction,
} from "@ui-kitten/components";
import AppText from "../components/AppText";
import { KeyboardAvoidingView } from "./extra/3rd-party";
import {
  SafeAreaView,
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import ImageInputList from "../components/ImageInputList";
import stationsApi from "../api/stations";
import useApi from "../hooks/useApi";

const siteData = [
  {
    id: "12345",
    city: "Brampton",
    terminal: [
      { name: "Toronto", rate: 10 },
      { name: "Brampton", rate: 30 },
    ],
  },
  {
    id: "37745",
    city: "Calgary",
    terminal: [
      { name: "Patiala", rate: 20 },
      { name: "Ludhiana", rate: 50 },
    ],
  },
  {
    id: "98845",
    city: "Toronto",
    terminal: [
      { name: "Jalandhar", rate: 40 },
      { name: "Chandigarh", rate: 60 },
    ],
  },
];

const renderSearchIcon = (props) => <Icon {...props} name="search" />;

const CalendarIcon = (props) => <Icon {...props} name="calendar" />;

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const NewLoadScreen = (props) => {
  const theme = useTheme();
  const [date, setDate] = React.useState(new Date());
  const [imageUris, setImageUris] = useState([]);
  const [rate, setRate] = useState(0);
  const [visible, setVisible] = React.useState(false);
  const [filtered, setFiltered] = React.useState(siteData);

  const [station, setStation] = React.useState({
    id: "SELECT",
    city: "SELECT",
    terminal: [{ name: "SELECT", rate: 0 }],
  });

  const getStationsApi = useApi(stationsApi.getSites);

  if (!getStationsApi.error) {
    filtered = getStationsApi.data.data;
  }

  useEffect(() => {
    getStationsApi.request();
  }, []);

  const handleSearchStation = (text) => {
    setFiltered(
      siteData.filter(
        (m) =>
          m.id.toLowerCase().includes(text.toLowerCase()) ||
          m.city.toLowerCase().startsWith(text.toLowerCase())
      )
    );
  };

  const TerminalSection = (props) => {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const [terminalName, setTerminalName] = React.useState(
      props.terminals[0].name
    );
    const renderOption = (t) => <SelectItem key={t.name} title={t.name} />;
    const selectedTerminal = props.terminals[selectedIndex.row];
    return (
      <>
        <Layout level="1">
          <Select
            value={selectedTerminal.name}
            onSelect={(index) => {
              setSelectedIndex(index);
              // setRate(props.terminals[index.row].rate);
              //setTerminalName(props.terminals[index.row].name);
            }}
          >
            {props.terminals.map(renderOption)}
          </Select>
        </Layout>
      </>
    );
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.id}`}
      description={`${item.city}`}
      onPress={() => {
        setStation(item);
        setRate(item.terminal[0].rate);
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
      setRate(rate + 20);
    }
  };

  const handleSplitMinus = () => {
    var afterMinus = rate - 20;
    if (afterMinus >= 0) {
      setRate(afterMinus);
    }
  };

  return (
    <>
      <Layout level="2" style={{ flex: 1 }}>
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

        <KeyboardAvoidingView>
          <View
            style={{
              padding: 10,
              paddingHorizontal: 20,
              backgroundColor: "white",
              marginTop: 5,
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <AppText category="s1">STATION</AppText>

              <Button
                appearance="outline"
                size="tiny"
                status="primary"
                onPress={() => setVisible(true)}
              >
                {" "}
                <AppText category="s1" status="primary">
                  {station.id}
                </AppText>
              </Button>
            </View>
            <View style={{ margin: 1 }} />
            <View style={{ marginBottom: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <AppText category="s1">CITY</AppText>
                <AppText category="s1">RATE</AppText>
              </View>
              <View style={{ margin: 3 }} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <AppText category="h6">{station.city.toUpperCase()}</AppText>
                <AppText category="h6">${rate}</AppText>
              </View>
            </View>
            <View style={{ margin: 6 }} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AppText category="s1">SPLIT LOADS</AppText>
              <ButtonGroup appearance="outline" status="primary" size="small">
                <Button onPress={handleSplitPlus}>
                  <AppText category="s1" status="primary">
                    +1
                  </AppText>
                </Button>
                <Button onPress={handleSplitMinus}>
                  <AppText category="s1" status="primary">
                    -1
                  </AppText>
                </Button>
              </ButtonGroup>
            </View>
            <View style={{ margin: 6 }} />
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <View style={{ flex: 1, marginRight: 3 }}>
                <AppText category="s1">TERMINAL</AppText>
                <View style={{ margin: 3 }} />
                <TerminalSection terminals={station.terminal} />
              </View>
              <View style={{ flex: 1, marginLeft: 3 }}>
                <AppText category="s1">DATE</AppText>
                <View style={{ margin: 3 }} />
                <Datepicker
                  placeholder="Pick Date"
                  date={date}
                  onSelect={(nextDate) => setDate(nextDate)}
                  accessoryRight={CalendarIcon}
                />
              </View>
            </View>
            <View style={{ marginBottom: 10 }}>
              <AppText category="s1">UPT SHIFT ID</AppText>
              <View style={{ margin: 3 }} />
              <Input returnKeyType="next" />
            </View>
            <View style={{ marginBottom: 10 }}>
              <AppText category="s1">WAITING</AppText>
              <View style={{ margin: 3 }} />
              <Input keyboardType="number-pad" />
            </View>
            <View style={{ marginBottom: 10 }}>
              <AppText category="s1">COMMENTS</AppText>
              <View style={{ margin: 3 }} />
              <Input />
            </View>
            <View style={{ marginBottom: 10 }}>
              <AppText category="s1">PAPERWORK</AppText>
              <View style={{ margin: 3 }} />
              <ImageInputList
                imageUris={imageUris}
                onAddImage={handleAdd}
                onRemoveImage={handleRemove}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <Button>SUBMIT</Button>
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Button appearance="outline">CANCEL</Button>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Layout>
      <SafeAreaView>
        <Modal
          visible={visible}
          backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onBackdropPress={() => setVisible(false)}
          style={{
            width: "80%",
            height: "70%",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              padding: 20,
              borderRadius: 5,
            }}
          >
            <AppText category="s1">STATION ID</AppText>
            <Input
              status="primary"
              style={{ marginTop: "3%" }}
              accessoryRight={renderSearchIcon}
              placeholder="Search..."
              onChangeText={handleSearchStation}
            />
            <View style={{ flex: 1 }}>
              <List
                data={filtered}
                style={{ backgroundColor: "white" }}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <Divider />}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default NewLoadScreen;

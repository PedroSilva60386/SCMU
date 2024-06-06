import { View, Text, StyleSheet, Switch } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { app } from "../services/fireBaseConfig";
import { useNavigation } from "@react-navigation/native";

const RoomList = () => {
  const [listRooms, setListRooms] = useState([]);
  const [openListRooms, setOpenListRooms] = useState(false);
  const [listUserValue, setListUserValue] = useState(null);
  const [switchValueAC, setSwitchValueAC] = useState(false);
  const [switchValueD, setSwitchValueD] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    app
      .firestore()
      .collection("rooms")
      .onSnapshot((querySnapshot) => {
        const newRooms = [];
        newRooms.push({ label: "Select Room", value: null });
        querySnapshot.forEach((doc) => {
          const { number, name, age } = doc.data();
          newRooms.push({ label: number, value: number, age, name });
        });
        setListRooms(newRooms);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.dropDownView, { zIndex: 3 }]}>
        <Text style={styles.title}>Rooms</Text>
        <DropDownPicker
          open={openListRooms}
          value={listUserValue}
          items={listRooms}
          setOpen={setOpenListRooms}
          setValue={setListUserValue}
          setItems={setListRooms}
          placeholder="Select Room"
          textStyle={{ fontSize: 18, fontWeight: "bold" }}
          style={styles.dropDown}
        />
      </View>
      {listUserValue ? (
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginTop: 1,
              marginBottom: 10,
              marginLeft: 10,
              alignSelf: "left",
              top: 50,
              right: 100,
              color: "black",
            }}
          >
            Room Information:
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 1,
              marginBottom: 10,
              marginLeft: 10,
              alignSelf: "left",
              top: 50,
              right: 100,
              color: "black",
            }}
          >
            Name: {listRooms.find((room) => room.value === listUserValue)?.name}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 1,
              marginBottom: 10,
              marginLeft: 10,
              alignSelf: "left",
              top: 50,
              right: 100,
              color: "black",
            }}
          >
            Age: {listRooms.find((room) => room.value === listUserValue)?.age}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "left",
              marginTop: 350,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "left",
                borderRadius: 10,
                right: 100,
                width: 200,
                backgroundColor: "#7CB9E8",
              }}
            >
              <Text style={{ marginLeft: 15, fontSize: 18 }}>AC</Text>
              <Switch
                left={100}
                value={switchValueAC}
                onValueChange={(value) => setSwitchValueAC(value)}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "left",
                  borderRadius: 10,
                  left: 125,
                  width: 200,
                  backgroundColor: "#7CB9E8",
                }}
              >
                <Text style={{ marginLeft: 20, fontSize: 18 }}>
                  Dehumidifier
                </Text>
                <Switch
                  left={20}
                  value={switchValueD}
                  onValueChange={(value) => setSwitchValueD(value)}
                />
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default RoomList;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  dropDownView: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "95%",
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    width: "100%",
  },
  dropdown: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    width: "97%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  button: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
    width: 250,
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  priceText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

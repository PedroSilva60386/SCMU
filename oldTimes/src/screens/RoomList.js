import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { app } from "../services/fireBaseConfig";
import { useNavigation } from "@react-navigation/native";

const RoomList = () => {
  const [listRooms, setListRooms] = useState([]);
  const [openListRooms, setOpenListRooms] = useState(false);
  const [listUserValue, setListUserValue] = useState(null);

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
          if (firebase.collection("users").role === "staff") return;
          newRooms.push({ label: number, value: name, age });
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

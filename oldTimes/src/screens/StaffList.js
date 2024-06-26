import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { app } from "../services/fireBaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authContext";

const StaffList = () => {
  const [listStaff, setListStaff] = useState([]);
  const [openListStaff, setOpenListStaff] = useState(false);
  const [listUserValue, setListUserValue] = useState(null);
  //const [listUserLabel, setListUserLabel] = useState(null);
  const { currentUser, userData } = useAuth();

  const navigation = useNavigation();
  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const newStaff = [];
        newStaff.push({ label: "Select Staff", value: null });
        querySnapshot.forEach((doc) => {
          const { email, role, username } = doc.data();
          if (role === "staff") {
            newStaff.push({ label: username, value: email });
          }
        });
        setListStaff(newStaff);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.dropDownView, { zIndex: 3 }]}>
        <Text style={styles.title}>Staff</Text>
        <DropDownPicker
          open={openListStaff}
          value={listUserValue}
          items={listStaff}
          //label={listUserLabel}
          setOpen={setOpenListStaff}
          setValue={setListUserValue}
          setItems={setListStaff}
          placeholder="Select Staff"
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
            Staff Information:
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
            Email: {listUserValue}
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
            Name:{" "}
            {listStaff.find((staff) => staff.value === listUserValue).label}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default StaffList;

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

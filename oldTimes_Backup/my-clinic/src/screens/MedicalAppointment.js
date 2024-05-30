import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import DatePicker from "react-native-modern-datepicker";
import { TextInput } from "react-native-gesture-handler";
import { app } from "../services/firebaseConfig";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";

const MedicalAppointment = () => {
  const navigation = useNavigation();
  const { userData } = useAuth();
  const [date, setDate] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState("");

  const [listDoctors, setListDoctors] = useState([]);
  const [openDoctors, setOpenDoctors] = useState(false);
  const [doctorValue, setDoctorValue] = useState(null);

  const [listTypes, setListTypes] = useState([
    { label: "General Consultation", value: "General Consultation" },
    { label: "Ophthalmology", value: "Ophthalmology" },
    { label: "Cardiology", value: "Cardiology" },
    { label: "Pediatric", value: "Pediatric" },
    { label: "Dermatology", value: "Dermatology" },
    { label: "Gynecology", value: "Gynecology" },
    { label: "Obstetrics", value: "Obstetrics" },
    { label: "Neurology", value: "Neurology" },
    { label: "Nutrition", value: "Nutrition" },
    { label: "Oncology", value: "Oncology" },
    { label: "Psychiatry", value: "Psychiatry" },
    { label: "Rheumatology", value: "Rheumatology" },
  ]);
  const [openTypes, setOpenTypes] = useState(false);
  const [typeValue, setTypeValue] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const newDoctors = [];
        querySnapshot.forEach((doc) => {
          const { email, name, role, type } = doc.data();
          if (doc.data().role === "doctor") {
            newDoctors.push({
              label: "Dr. " + name + " (" + type + ")",
              value: email,
            });
          }
        });
        setListDoctors(newDoctors);
      });
  }, []);

  const confirmAppointment = async () => {
    setLoading(true);
    try {
      handleAddAppo();
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      alert("Register error: " + error.message);
    }
  };

  const handleAddAppo = () => {
    if (isOnline) {
      app.firestore().collection("appointments").add({
        checkIn: false,
        clientEmail: userData.email,
        date,
        doctorEmail: doctorValue,
        desc,
        type: typeValue,
        link: "https://videoconf-colibri.zoom.us/j/2743203850",
      });
    } else {
      app.firestore().collection("appointments").add({
        checkIn: false,
        clientEmail: userData.email,
        date,
        doctorEmail: doctorValue,
        desc,
        type: typeValue,
      });
    }
  };

  function handleOnPress() {
    setOpenDate(!openDate);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Schedule your appointment</Text>
      {date ? <Text>Date Picked: {date}</Text> : <Text>No date selected</Text>}
      <View>
        <TouchableOpacity style={styles.dateButton} onPress={handleOnPress}>
          <Text style={styles.centerText}>
            {date ? "Change Date" : "Choose Date"}
          </Text>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={openDate}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker onSelectedChange={(date) => setDate(date)} />
              <TouchableOpacity onPress={handleOnPress}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <DropDownPicker
        open={openTypes}
        value={typeValue}
        items={listTypes}
        setOpen={setOpenTypes}
        setValue={setTypeValue}
        setItems={setListTypes}
        style={[styles.dropdown, { zIndex: 2 }]}
        placeholder="Select type of appointment"
        textStyle={{ fontSize: 18, fontWeight: "bold" }}
      />
      <DropDownPicker
        open={openDoctors}
        value={doctorValue}
        items={listDoctors}
        setOpen={setOpenDoctors}
        setValue={setDoctorValue}
        setItems={setListDoctors}
        style={[styles.dropdown, { zIndex: 1 }]}
        placeholder="Select your preferred doctor"
        textStyle={{ fontSize: 18, fontWeight: "bold" }}
      />
      <TextInput
        style={styles.textBox}
        placeholder="Description"
        value={desc}
        onChangeText={(desc) => setDesc(desc)}
        multiline={true}
        textAlignVertical="top"
      ></TextInput>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Checkbox
          value={isOnline}
          onValueChange={setIsOnline}
          color={isOnline ? "#4c00b0" : undefined}
        />
        <Text style={{ marginLeft: 10, fontSize: 18 }}>Online Appointment</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          confirmAppointment();
        }}
      >
        <Text style={styles.buttonText}>Confirm appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MedicalAppointment;

import { View, Text, Button, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import DatePicker from "react-native-modern-datepicker";
import { TextInput } from "react-native-gesture-handler";
import { app } from "../services/firebaseConfig";
import DropDownPicker from "react-native-dropdown-picker";

const MedicalExam = () => {
  const [loading, setLoading] = useState("");

  const [date, setDate] = useState("");
  const [openDate, setOpenDate] = useState(false);

  const [listDoctors, setListDoctors] = useState([]);
  const [openDoctors, setOpenDoctors] = useState(false);
  const [doctorValue, setDoctorValue] = useState(null);

  const [listEquipments, setListEquipments] = useState([
    { label: "X-Ray", value: "X-Ray" },
    { label: "Tac", value: "Tac" },
    { label: "Magnetic Resonance", value: "Magnetic Resonance" },
    { label: "Ultrasound", value: "Ultrasound" },
  ]);
  const [openEquipments, setOpenEquipments] = useState(false);
  const [equipmentValue, setEquipmentValue] = useState(null);

  const [desc, setDesc] = useState("");

  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();

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

  const confirmMedicalExam = async () => {
    setLoading(true);
    try {
      handleAddExam();
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      alert("Register error: " + error.message);
    }
  };

  const handleAddExam = () => {
    app.firestore().collection("examEquipment").add({
      checkIn: false,
      client: userData.email,
      date,
      doctor: doctorValue,
      equipment: equipmentValue,
      desc,
    });
  };

  function handleOnPress() {
    setOpenDate(!openDate);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Schedule your medical exam</Text>
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
        open={openDoctors}
        value={doctorValue}
        items={listDoctors}
        setOpen={setOpenDoctors}
        setValue={setDoctorValue}
        setItems={setListDoctors}
        style={[styles.dropdown, { zIndex: 2 }]}
        placeholder="Select your preferred doctor"
        textStyle={{ fontSize: 18, fontWeight: "bold" }}
      />
      <DropDownPicker
        open={openEquipments}
        value={equipmentValue}
        items={listEquipments}
        setOpen={setOpenEquipments}
        setValue={setEquipmentValue}
        setItems={setListEquipments}
        style={[styles.dropdown, { zIndex: 1 }]}
        placeholder="Select the type of exam"
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          confirmMedicalExam();
        }}
      >
        <Text style={styles.buttonText}>Confirm Medical Exam</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MedicalExam;

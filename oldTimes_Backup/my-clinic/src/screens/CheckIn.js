import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import DatePicker from "react-native-modern-datepicker";
import { TextInput } from "react-native-gesture-handler";
import { app } from "../services/firebaseConfig";
import DropDownPicker from "react-native-dropdown-picker";

const CheckIn = () => {
  const [listAppointments, setListAppointments] = useState([]);
  const [appointmentValue, setAppointmentValue] = useState(null);
  const [openAppointment, setOpenAppointment] = useState(false);

  const [listExams, setListExams] = useState([]);
  const [examValue, setExamValue] = useState(null);
  const [openExams, setOpenExams] = useState(false);

  const [appointementsSelected, setAppointmentsSelected] = useState(false);
  const [examsSelected, setExamsSelected] = useState(false);

  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();

  useEffect(() => {
    app
      .firestore()
      .collection("appointments")
      .onSnapshot((querySnapshot) => {
        const newAppointments = [];
        querySnapshot.forEach((doc) => {
          const { type, date } = doc.data();
          if ((userData.email = doc.data().clientEmail) && !doc.data().checkIn) {
            newAppointments.push({
              label: type + ", " + date,
              value: doc.id,
            });
          }
        });
        setListAppointments(newAppointments);
      });
  }, []);

  useEffect(() => {
    app
      .firestore()
      .collection("examEquipment")
      .onSnapshot((querySnapshot) => {
        const newExams = [];
        querySnapshot.forEach((doc) => {
          const { equipment, date } = doc.data();
          if ((userData.email = doc.data().client) && !doc.data().checkIn) {
            newExams.push({
              label: equipment + ", " + date,
              value: doc.id,
            });
          }
        });
        setListExams(newExams);
      });
  }, []);

  const getAppointmentsList = () => {
    if (!appointementsSelected) {
      setAppointmentsSelected(true);
      if (examsSelected) {
        setExamsSelected(false);
      }
    }
  };

  const getExamsList = () => {
    if (!examsSelected) {
      setExamsSelected(true);
      if (appointementsSelected) {
        setAppointmentsSelected(false);
      }
    }
  };

  const handleCheckIn = () => {
    if (appointementsSelected && appointmentValue) {
      app
        .firestore()
        .collection("appointments")
        .doc(appointmentValue)
        .update({
          checkIn: true,
        })
        .then(() => {
          alert(
            "You have check in for your appointment. You can go to the waiting area"
          );
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert(error);
        });
    } else if (examsSelected && examValue) {
      app
        .firestore()
        .collection("examEquipment")
        .doc(examValue)
        .update({
          checkIn: true,
        })
        .then(() => {
          alert(
            "You have check in for your exam. You can go to the waiting area"
          );
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "97%",
          marginTop: 50,
          marginBottom: 100,
        }}
      >
        <TouchableOpacity style={styles.button} onPress={getAppointmentsList}>
          <Text style={styles.buttonText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getExamsList}>
          <Text style={styles.buttonText}>Exams</Text>
        </TouchableOpacity>
      </View>
      {appointementsSelected ? (
        <View>
          <DropDownPicker
            open={openAppointment}
            value={appointmentValue}
            items={listAppointments}
            setOpen={setOpenAppointment}
            setValue={setAppointmentValue}
            setItems={setListAppointments}
            style={styles.dropdown}
            placeholder="Select appointment to do the check in"
            textStyle={{ fontSize: 18, fontWeight: "bold" }}
          />
        </View>
      ) : (
        <></>
      )}
      {examsSelected ? (
        <View>
          <DropDownPicker
            open={openExams}
            value={examValue}
            items={listExams}
            setOpen={setOpenExams}
            setValue={setExamValue}
            setItems={setListExams}
            style={styles.dropdown}
            placeholder="Select exam to do the check in"
            textStyle={{ fontSize: 18, fontWeight: "bold" }}
          />
        </View>
      ) : (
        <></>
      )}
      <TouchableOpacity style={styles.button} onPress={handleCheckIn}>
        <Text style={styles.buttonText}>Check In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckIn;

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { app } from "../services/firebaseConfig";
import { getApp } from "firebase/app";
import { useNavigation } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";

const CreateReceipt = () => {
  const [listUsers, setListUsers] = useState([]);
  const [openListUsers, setOpenListUsers] = useState(false);
  const [listUserValue, setListUserValue] = useState(null);

  const [listAppointments, setListAppointments] = useState([]);
  const [openListAppointments, setOpenListAppointments] = useState(false);
  const [listAppointmentValue, setListAppointmentValue] = useState(null);
  const [appointmentPrice, setAppointmentPrice] = useState(null);

  const [listExams, setListExams] = useState([]);
  const [openListExams, setOpenListExams] = useState(false);
  const [listExamsValue, setListExamsValue] = useState(null);
  const [examPrice, setExamPrice] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const newUsers = [];
        newUsers.push({ label: "Select user", value: null });
        querySnapshot.forEach((doc) => {
          const { email, name, role, insurance } = doc.data();
          if (doc.data().role === "client") {
            newUsers.push({ label: name, value: email, role, insurance });
          }
        });
        setListUsers(newUsers);
      });
  }, []);

  useEffect(() => {
    if (listUsers) {
      app
        .firestore()
        .collection("appointments")
        .onSnapshot((querySnapshot) => {
          const newAppointments = [];
          newAppointments.push({ label: "Select appointment", value: null });
          querySnapshot.forEach((doc) => {
            const { type, clientEmail, doctorEmail, date, isPaid, paidValue } =
              doc.data();
            if (doc.data().clientEmail === listUserValue && doc.data().isPaid) {
              newAppointments.push({
                label: type + ", " + date,
                value: doc.id,
                clientEmail,
                doctorEmail,
                date,
                isPaid,
                paidValue,
              });
            }
          });
          setListAppointments(newAppointments);
        });
    }
  }, [listUserValue]);

  useEffect(() => {
    if (listUsers) {
      app
        .firestore()
        .collection("examEquipment")
        .onSnapshot((querySnapshot) => {
          const newExams = [];
          newExams.push({ label: "Select exam", value: null });
          querySnapshot.forEach((doc) => {
            const { equipment, client, doctor, date, isPaid, paidValue } =
              doc.data();
            if (doc.data().client === listUserValue && isPaid) {
              newExams.push({
                label: equipment + ", " + date,
                value: doc.id,
                client,
                doctor,
                date,
                isPaid,
                paidValue,
              });
            }
          });
          setListExams(newExams);
        });
    }
  }, [listUserValue]);

  const handleCreateReceipt = () => {
    const createdAt = Timestamp.now().toDate().toLocaleDateString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    if (appointmentPrice) {
      if (examPrice) {
        if (
          !listAppointments.find((item) => item.value === listAppointmentValue)
            .isPaid &&
          !listExams.find((item) => item.value === listExamsValue).isPaid
        ) {
          alert("Appointment or medical exam were not paid yet");
        } else {
          app
            .firestore()
            .collection("receipts")
            .add({
              appointment: listAppointmentValue,
              appointmentDescription: listAppointments.find(
                (item) => item.value === listAppointmentValue
              ).label,
              appointmentPrice,
              exam: listExamsValue,
              examDescription: listExams.find(
                (item) => item.value === listExamsValue
              ).label,
              examPrice,
              user: listUserValue,
              insurance: listUsers.find((item) => item.value === listUserValue)
                .insurance
                ? listUsers.find((item) => item.value === listUserValue)
                    .insurance
                : "N/A",
              total: appointmentPrice + examPrice,
              createdAt,
            });
          alert("Receipt created successfully");
          navigation.navigate("Home");
        }
      } else {
        app
          .firestore()
          .collection("receipts")
          .add({
            appointment: listAppointmentValue,
            appointmentDescription:
              listAppointments.find(
                (item) => item.value === listAppointmentValue
              ).label +
              ", " +
              listAppointments.find(
                (item) => item.value === listAppointmentValue
              ).date,
            appointmentPrice,
            user: listUserValue,
            insurance: listUsers.find((item) => item.id === listUserValue)
              .insurance
              ? listUsers.find((item) => item.id === listUserValue).insurance
              : "N/A",
            total: appointmentPrice,
            createdAt,
          });
        alert("Receipt created successfully");
        navigation.navigate("Home");
      }
    } else if (examPrice) {
      app
        .firestore()
        .collection("receipts")
        .add({
          exam: listExamsValue,
          examDescription:
            listExams.find((item) => item.value === listExamsValue).equipment +
            ", " +
            listExams.find((item) => item.value === listExamsValue).date,
          examPrice,
          user: listUserValue,
          insurance: listUsers.find((item) => item.id === listUserValue)
            .insurance
            ? listUsers.find((item) => item.id === listUserValue).insurance
            : "N/A",
          total: examPrice,
          createdAt,
        });
      alert("Receipt created successfully");
      navigation.navigate("Home");
    } else {
      alert("Please select an appointment or a medical exam");
    }
  };

  useEffect(() => {
    if (listAppointmentValue) {
      const selectedAppointment = listAppointments.find(
        (item) => item.value === listAppointmentValue
      );
      if (selectedAppointment) {
        setAppointmentPrice(selectedAppointment.paidValue);
      }
    }
  }, [listAppointmentValue]);

  useEffect(() => {
    if (listExamsValue) {
      const selectedExam = listExams.find(
        (item) => item.value === listExamsValue
      );
      if (selectedExam) {
        setExamPrice(selectedExam.paidValue);
      }
    }
  }, [listExamsValue]);

  return (
    <View style={styles.container}>
      <View style={[styles.dropDownView, { zIndex: 3 }]}>
        <Text style={styles.title}>User</Text>
        <DropDownPicker
          open={openListUsers}
          value={listUserValue}
          items={listUsers}
          setOpen={setOpenListUsers}
          setValue={setListUserValue}
          setItems={setListUsers}
          placeholder="Select user"
          textStyle={{ fontSize: 18, fontWeight: "bold" }}
          style={styles.dropDown}
        />
      </View>
      {listUserValue ? (
        <>
          <View style={[styles.dropDownView, { zIndex: 2 }]}>
            <Text style={styles.title}>Appointment</Text>
            <DropDownPicker
              open={openListAppointments}
              value={listAppointmentValue}
              items={listAppointments}
              setOpen={setOpenListAppointments}
              setValue={setListAppointmentValue}
              setItems={setListAppointments}
              placeholder="Select appointment"
              textStyle={{ fontSize: 18, fontWeight: "bold" }}
              style={styles.dropDown}
            />
          </View>
          <View style={[styles.dropDownView, { zIndex: 1 }]}>
            <Text style={styles.title}>Medical Exam</Text>
            <DropDownPicker
              open={openListExams}
              value={listExamsValue}
              items={listExams}
              setOpen={setOpenListExams}
              setValue={setListExamsValue}
              setItems={setListExams}
              placeholder="Select exam"
              textStyle={{ fontSize: 18, fontWeight: "bold" }}
              style={styles.dropDown}
            />
          </View>
          {listAppointmentValue ? (
            <Text style={styles.priceText}>
              Appointment Price: {appointmentPrice}€
            </Text>
          ) : (
            <Text style={styles.priceText}>No Price for Appointment</Text>
          )}
          {listAppointmentValue ? (
            <Text style={styles.priceText}>Exam Price: {examPrice}€</Text>
          ) : (
            <Text style={styles.priceText}>No Price for Exam</Text>
          )}
          <TouchableOpacity
            style={[styles.button, { zIndex: 0 }]}
            onPress={handleCreateReceipt}
          >
            <Text style={styles.buttonText}>Create Receipt</Text>
          </TouchableOpacity>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CreateReceipt;

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

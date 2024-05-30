import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import Slider from "@react-native-community/slider";
import { styles } from "../styles/styles";
import { app } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const AutoTriage = () => {
  const defaultDoctor = { name: "Dr. John Paul", email: "jp@myclinic.com" };

  const navigation = useNavigation();

  const { currentUser, userData } = useAuth();
  const [options, setOptions] = useState([
    { text: "My heart/chest hurts", value: "Cardiology" },
    { text: "My kid isn't feeling very well", value: "Pediatric" },
    { text: "I need a colonoscopy", value: "Colonoscopy" },
    { text: "I have a skin issue", value: "Dermatology" },
    { text: "I need a general consultation", value: "General Consultation" },
    { text: "I have gynecological concerns", value: "Gynecology" },
    { text: "I need an MRI scan", value: "Magnetic Resonance" },
    { text: "I have neurological symptoms", value: "Neurology" },
    { text: "I need nutrition advice", value: "Nutrition" },
    { text: "I am pregnant or need obstetrics care", value: "Obstetrics" },
    { text: "I have cancer concerns", value: "Oncology" },
    { text: "I need an eye check-up", value: "Ophthalmology" },
    { text: "I need psychiatric help", value: "Psychiatry" },
    { text: "I have joint pain or rheumatic symptoms", value: "Rheumatology" },
    { text: "I need a CT scan", value: "Tac" },
    { text: "I need an ultrasound", value: "Ultrasound" },
    { text: "I need an X-ray", value: "X-Ray" },
  ]);
  const [doctors, setDoctors] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionText, setSelectedOptionText] = useState("");
  const [sliderValue, setSliderValue] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = app
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const newDoctors = [];
        querySnapshot.forEach((doc) => {
          const { email, name, role, type } = doc.data();
          if (doc.data().role === "doctor") {
            newDoctors.push({ name: "Dr. " + name, email: email, type });
          }
        });
        setDoctors(newDoctors);
      });

    return () => unsubscribe();
  }, []);

  const TriageFirstContent = () => {
    if (!userData) {
      return <ActivityIndicator color="#0000ff" size="large" />;
    }

    if (userData.role !== "client") {
      return (
        <Text>
          You're a {userData.role}. You don't have access to this content
        </Text>
      );
    }

    const calculateAppointmentDate = (urgency) => {
      const now = new Date();
      const daysToAdd = 11 - urgency; // More urgent (higher slider value) means fewer days to add
      const appointmentDate = new Date(now.setDate(now.getDate() + daysToAdd));

      return appointmentDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    };

    const findDoctor = (specialization) => {
      const doctor = doctors.find((doc) => doc.type === specialization);
      return doctor ? doctor : defaultDoctor;
    };

    const appointmentDate = calculateAppointmentDate(sliderValue);
    const selectedDoctor = findDoctor(selectedOption);

    const handleAddAppointment = () => {
      app
        .firestore()
        .collection("appointments")
        .add({
          checkIn: false,
          clientEmail: userData.email,
          date: appointmentDate,
          doctorEmail: selectedDoctor.email,
          desc: selectedOptionText,
          type: selectedOption,
        })
        .then(() => {
          setModalVisible(false);
          alert("Appointment created successfully!");
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert("Error creating appointment: " + error.message);
        });
    };

    return (
      <View style={styles1.container}>
        <View style={styles1.firstTextView}>
          <Text style={styles1.firstText}>Hello {userData.name}</Text>
          <Text style={styles1.firstText}>Welcome to the Automatic Triage</Text>
          <Text style={styles1.firstText}>How can we help you?</Text>
        </View>
        <View style={{ position: "absolute", top: 140, width: "95%" }}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            horizontal={true}
            scrollEnabled={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedOption(item.value);
                  setSelectedOptionText(item.text);
                }}
              >
                <View
                  style={[
                    styles1.card,
                    {
                      backgroundColor:
                        item.value === selectedOption ? "#6A0DAD" : "#4c00b0",
                    },
                  ]}
                >
                  <Text style={styles1.cardText}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          {selectedOption ? (
            <>
              <Text
                style={{ textAlign: "center", marginTop: 20, fontSize: 20 }}
              >
                Selected Option:{" "}
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {selectedOptionText}
                </Text>
              </Text>
              <Text style={styles1.sliderLabel}>
                On a scale of 1 to 10, how urgent is your need for this
                consultation? (10 is very urgent)
              </Text>
              <Slider
                style={styles1.slider}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={sliderValue}
                onValueChange={(value) => setSliderValue(value)}
                minimumTrackTintColor="#6A0DAD"
                maximumTrackTintColor="#000000"
                thumbTintColor="#6A0DAD"
              />
              <Text style={styles1.sliderValueText}>
                Urgency Level: {sliderValue}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View
                  style={[styles1.card, { alignSelf: "center", marginTop: 60 }]}
                >
                  <Text style={styles1.cardText}>Get Advice</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles1.modalText}>
                Based on your answers, this is our suggestion:
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 18 }}>
                Consult Type: {selectedOption}
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 18 }}>
                Consult Date: {appointmentDate}
              </Text>
              <Text style={{ marginBottom: 20, fontSize: 18 }}>
                Doctor: {selectedDoctor.name}
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Pressable
                  style={[
                    styles1.button,
                    styles1.buttonClose,
                    { marginRight: 20 },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close Notification</Text>
                </Pressable>
                <Pressable
                  style={[styles1.button, styles1.buttonClose]}
                  onPress={() => handleAddAppointment()}
                >
                  <Text style={styles.textStyle}>Create Appointment</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View>
      <TriageFirstContent />
    </View>
  );
};

export default AutoTriage;

const styles1 = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  firstTextView: {
    marginTop: 20,
  },
  firstText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  dropdown: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 40,
    height: 50,
    width: "90%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  card: {
    width: 200,
    height: 80,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#4c00b0",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  sliderLabel: {
    fontSize: 16,
    marginTop: 50,
    textAlign: "center",
  },
  slider: {
    width: "90%",
    height: 40,
    alignSelf: "center",
    marginTop: 10,
  },
  sliderValueText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    padding: 10,
  },
});

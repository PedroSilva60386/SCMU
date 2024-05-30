import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { app } from "../services/firebaseConfig";

const DoctorPatients = ({ route }) => {
  const navigation = useNavigation();
  const [listAppoint, setListAppoint] = useState([]);
  const [listPatients, setListPatients] = useState([]);

  useEffect(() => {
    app
      .firestore()
      .collection("appointments")
      .onSnapshot((querySnapshot) => {
        const docAppoint = [];
        querySnapshot.forEach((appoint) => {
          const { clientEmail, doctorEmail, type } = appoint.data();
          if (appoint.data().doctorEmail === route.params.userData.email) {
            docAppoint.push({ clientEmail, doctorEmail, type });
          }
        });
        setListAppoint(docAppoint);
      });
  }, []);

  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const docPati = [];
        const uniqueEmails = new Set();
        querySnapshot.forEach((patis) => {
          const { email, name, gender, weight, height, birthDate, birthPlace } =
            patis.data();
          listAppoint.forEach((appoi) => {
            if (
              patis.data().email === appoi.clientEmail &&
              !uniqueEmails.has(email)
            ) {
              uniqueEmails.add(email);
              docPati.push({
                email,
                name,
                gender,
                weight,
                height,
                birthDate,
                birthPlace,
              });
            }
          });
        });
        setListPatients(docPati);
      });
  }, [listAppoint]);

  return (
    <View style={styles.container}>
      <FlatList
        data={listPatients}
        renderItem={({ item }) => (
          <View style={styles.box}>
            <Text style={styles.text}>{item.name}</Text>
            <TouchableOpacity
              style={styles.patiButton}
              onPress={() => navigation.navigate("PatientInfo", { item })}
            >
              <Text style={styles.patiButtonText}>Info</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default DoctorPatients;

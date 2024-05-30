import { View, Text, StyleSheet, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { app } from "../services/firebaseConfig";
import { useAuth } from "../contexts/authContext";
const UserAppointments = () => {
  const [appoi, setAppointment] = useState([]);
  const { currentUser, userData } = useAuth();

  useEffect(() => {
    app
      .firestore()
      .collection("appointments")
      .onSnapshot((querySnapshot) => {
        if (userData) {
          const newAppos = [];
          querySnapshot.forEach((appoi) => {
            const {
              link,
              checkIn,
              clientEmail,
              date,
              desc,
              doctorEmail,
              type,
            } = appoi.data();
            if (appoi.data().clientEmail === userData.email) {
              newAppos.push({
                link,
                checkIn,
                clientEmail,
                date,
                desc,
                doctorEmail,
                type,
                id: appoi.id,
              });
            }
          });
          setAppointment(newAppos);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={appoi}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <View style={styles.card}>
              {item.link ? (
                <Text>
                  Appointment link: Click{" "}
                  <Text style={{color: "blue", fontWeight: "bold"}} onPress={() => Linking.openURL(item.link)}>here</Text>
                </Text>
              ) : (
                <></>
              )}
              {item.date ? (
                <>
                  <Text>Appointment Date: {item.date}</Text>
                </>
              ) : (
                <></>
              )}
              {item.doctorEmail ? (
                <>
                  <Text>Doctor email: {item.doctorEmail}</Text>
                </>
              ) : (
                <></>
              )}
              {item.type ? (
                <>
                  <Text>Appointment type: {item.type}</Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </>
        )}
      />
    </View>
  );
};

export default UserAppointments;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    marginBottom: 5,
  },
});

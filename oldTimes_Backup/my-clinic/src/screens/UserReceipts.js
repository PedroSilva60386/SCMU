import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { app } from "../services/firebaseConfig";
import { useAuth } from "../contexts/authContext";
const UserReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const { currentUser, userData } = useAuth();

  useEffect(() => {
    app
      .firestore()
      .collection("receipts")
      .onSnapshot((querySnapshot) => {
        if (userData) {
          const newReceipts = [];
          querySnapshot.forEach((doc) => {
            const {
              appointment,
              appointmentDescription,
              appointmentPrice,
              exam,
              examDescription,
              examPrice,
              insurance,
              total,
              user,
              createdAt,
            } = doc.data();
            if (doc.data().user === userData.email) {
              newReceipts.push({
                appointment,
                appointmentDescription,
                appointmentPrice,
                exam,
                examDescription,
                examPrice,
                insurance,
                total,
                user,
                createdAt,
                id: doc.id,
              });
            }
          });
          setReceipts(newReceipts);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={receipts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <Text>Receipt Emission Date: {item.createdAt.toString()}</Text>
            <View style={styles.card}>
              {item.insurance ? (
                <Text>Insurance Used: {item.insurance}</Text>
              ) : (
                <></>
              )}
              {item.appointment ? (
                <>
                  <Text>{item.appointmentDescription}</Text>
                  <Text>Appointment Cost: {item.appointmentPrice}€</Text>
                </>
              ) : (
                <></>
              )}
              {item.exam ? (
                <>
                  <Text>{item.examDescription}</Text>
                  <Text>Exam Cost: {item.examPrice}€</Text>
                </>
              ) : (
                <></>
              )}

              <Text>Total Cost: {item.total}€</Text>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default UserReceipts;

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

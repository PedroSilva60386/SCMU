import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { app } from "../services/firebaseConfig";
import { equalTo } from "firebase/database";

const Payments = () => {
  const { currentUser, userData } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [medicalExams, setMedicalExams] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showMedicalExams, setShowMedicalExams] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [prices, setPrices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [userDiscount, setUserDiscount] = useState();

  useEffect(() => {
    const fetchDiscount = async () => {
      if (userData.insurance) {
        const insuranceDoc = await app
          .firestore()
          .collection("insurances")
          .doc(userData.insurance)
          .get();
        if (insuranceDoc.exists) {
          setUserDiscount(insuranceDoc.data().discount || 0);
        }
      }
    };

    fetchDiscount();
  }, [userData.insurance]);

  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const newDoctors = [];
        querySnapshot.forEach((doc) => {
          const { email, name, role } = doc.data();
          if (doc.data().role === "doctor") {
            newDoctors.push({ name: "Dr. " + name, email: email });
          }
        });
        setDoctors(newDoctors);
      });
  }, []);

  useEffect(() => {
    app
      .firestore()
      .collection("prices")
      .onSnapshot((querySnapshot) => {
        const newPrices = [];
        querySnapshot.forEach((doc) => {
          const { type, price } = doc.data();
          newPrices.push({
            type,
            price,
            id: doc.id,
          });
        });
        setPrices(newPrices);
      });
  }, []);

  useEffect(() => {
    app
      .firestore()
      .collection("appointments")
      .onSnapshot((querySnapshot) => {
        const newAppointments = [];
        querySnapshot.forEach((doc) => {
          const { type, checkIn, isPaid, clientEmail, date, doctorEmail } =
            doc.data();
          if (doc.data().clientEmail === userData.email && checkIn && !isPaid) {
            newAppointments.push({
              type,
              checkIn,
              isPaid,
              clientEmail,
              date,
              doctorEmail,
              id: doc.id,
            });
          }
        });
        setAppointments(newAppointments);
      });
  }, []);

  useEffect(() => {
    app
      .firestore()
      .collection("examEquipment")
      .onSnapshot((querySnapshot) => {
        const newMedicalExams = [];
        querySnapshot.forEach((doc) => {
          const { equipment, checkIn, isPaid, client, date, doctor } =
            doc.data();
          if (doc.data().client === userData.email && checkIn && !isPaid) {
            newMedicalExams.push({
              equipment,
              checkIn,
              isPaid,
              client,
              date,
              doctor,
              id: doc.id,
            });
          }
        });
        setMedicalExams(newMedicalExams);
      });
  }, []);

  const handleAppPayment = async (id, type) => {
    setPayLoading(true);
    setShowAppointments(false);
    setShowMedicalExams(false);

    try {
      await app
        .firestore()
        .collection("appointments")
        .doc(id)
        .update({
          isPaid: true,
          paidValue: getPrice(type) * (1 - userDiscount * 0.01),
        });
      alert("Payment made");
    } catch (error) {
      alert("Payment failed");
    } finally {
      setPayLoading(false);
    }
  };

  const handleExamPayment = async (id, type) => {
    setPayLoading(true);
    setShowAppointments(false);
    setShowMedicalExams(false);

    try {
      await app
        .firestore()
        .collection("examEquipment")
        .doc(id)
        .update({
          isPaid: true,
          paidValue: getPrice(type) * (1 - userDiscount * 0.01),
        });
      alert("Payment made");
    } catch (error) {
      alert("Payment failed");
    } finally {
      setPayLoading(false);
    }
  };

  const getPrice = (type) => {
    const price = prices.find((price) => price.id === type);
    return price.price ? price.price : "N/A";
  };

  const getDoctor = (email) => {
    const doctor = doctors.find((doctor) => doctor.email === email);
    return doctor.name ? doctor.name : "N/A";
  };
  return (
    <View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Select one of the two to make payment
        </Text>
      </View>
      <View style={styles.container}>
        <Text
          style={styles.title}
          onPress={() => {
            setShowMedicalExams(false);
            setShowAppointments(true);
          }}
        >
          Appointments
        </Text>
        <Text
          style={styles.title}
          onPress={() => {
            setShowAppointments(false);
            setShowMedicalExams(true);
          }}
        >
          Medical Exams
        </Text>
      </View>
      <View style={styles.listView}>
        {payLoading ? (
          <ActivityIndicator color="#0000ff" size="large" />
        ) : (
          <>
            {showAppointments ? (
              <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View style={{ alignItems: "center" }}>
                      <Text style={styles.cardText}>{item.type}</Text>
                      <Text>{item.date}</Text>
                      <Text>
                        Price to pay:{" "}
                        {getPrice(item.type) * (1 - userDiscount * 0.01)}€
                        (Total would be {getPrice(item.type)}
                        €)
                      </Text>
                      <Text>{getDoctor(item.doctorEmail)}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.payButton}
                      onPress={() => {
                        handleAppPayment(item.id, item.type);
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        PAY
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            ) : (
              <></>
            )}
            {showMedicalExams ? (
              <FlatList
                data={medicalExams}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View style={{ alignItems: "center" }}>
                      <Text style={styles.cardText}>{item.equipment}</Text>
                      <Text>{item.date}</Text>
                      <Text>
                        Price to pay:{" "}
                        {getPrice(item.equipment) * (1 - userDiscount * 0.01)}€
                        (Total would be {getPrice(item.equipment)}
                        €)
                      </Text>
                      <Text>{getDoctor(item.doctor)}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.payButton}
                      onPress={() => {
                        handleExamPayment(item.id, item.equipment);
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        PAY
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            ) : (
              <></>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "purple",
  },
  card: {
    backgroundColor: "white",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  listView: {
    width: "95%",
    alignSelf: "center",
  },
  payButton: {
    backgroundColor: "purple",
    width: 60,
    height: 60,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 100,
  },
});

import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import { styles } from "../styles/styles";
import { app } from "../services/firebaseConfig";

const Home = () => {
  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();

  const [listDocAppos, setListDocAppos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [listClientAppos, setListClientAppos] = useState([]);

  useEffect(() => {
    let unsubscribe;

    if (userData) {
      if (userData.role === "doctor") {
        unsubscribe = app
          .firestore()
          .collection("appointments")
          .where("doctorEmail", "==", userData.email)
          .onSnapshot((querySnapshot) => {
            const newAppos = [];
            querySnapshot.forEach((appo) => {
              const { date, type, link } = appo.data();
              newAppos.push({ date, type, link });
            });
            setListDocAppos(newAppos);
            setModalVisible(true); // Set modalVisible to true once data is fetched
          });
      }
    }

    return () => {
      // Unsubscribe from the snapshot listener when component unmounts
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userData]);

  useEffect(() => {
    let unsubscribe;

    if (userData) {
      if (userData.role === "client") {
        unsubscribe = app
          .firestore()
          .collection("appointments")
          .where("clientEmail", "==", userData.email)
          .onSnapshot((querySnapshot) => {
            const newAppos = [];
            querySnapshot.forEach((appo) => {
              const { date, type, link } = appo.data();
              newAppos.push({ date, type, link });
            });
            setListClientAppos(newAppos);
            setModalVisible(true); // Set modalVisible to true once data is fetched
          });
      }
    }

    return () => {
      // Unsubscribe from the snapshot listener when component unmounts
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userData]);

  const handlePressToLink = () => {
    Linking.openURL(userData.link);
  };

  console.log(listClientAppos);

  const HomeContent = () => {
    if (userData || userData === undefined || userData === null) {
      if (userData.role === "client") {
        return (
          <View style={styles.container}>
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
                <View style={stylesModal.modalView}>
                  {listClientAppos.length > 0 ? (
                    <>
                      <Text style={stylesModal.modalText}>
                        Your appointments:
                      </Text>
                      <FlatList
                        data={listClientAppos}
                        renderItem={({ item }) => (
                          <View style={styles.box}>
                            <Text style={stylesModal.modalText}>
                              {item.date}
                            </Text>
                            <Text style={stylesModal.modalText}>
                              {item.type}
                            </Text>
                            {item.link ? (
                              <Text style={stylesModal.modalText}>
                                Appointment is Online
                              </Text>
                            ) : (
                              <></>
                            )}
                          </View>
                        )}
                      />
                    </>
                  ) : (
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        marginBottom: 10,
                      }}
                    >
                      No appointments in the near future
                    </Text>
                  )}

                  <Pressable
                    style={[stylesModal.button, stylesModal.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close Notification</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("AutoTriage")}
            >
              <Text style={styles.buttonText}>Auto Triage</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("MedicalAppointment")}
            >
              <Text style={styles.buttonText}>
                Schedule Medical Appointment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("MedicalExam")}
            >
              <Text style={styles.buttonText}>Schedule Medical Exam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("CheckIn")}
            >
              <Text style={styles.buttonText}>Check In</Text>
            </TouchableOpacity>
          </View>
        );
      }
      if (userData.role === "doctor") {
        return (
          <View>
            <Text style={styles.topLeftText}>
              My online meeting link: click{" "}
              <Text
                style={[styles.link, styles.bold]}
                onPress={handlePressToLink}
              >
                here
              </Text>
            </Text>
            <View style={styles.containerHome}>
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
                  <View style={stylesModal.modalView}>
                    <Text style={stylesModal.modalText}>
                      Your appointments:
                    </Text>
                    <FlatList
                      data={listDocAppos}
                      renderItem={({ item }) => (
                        <View style={styles.box}>
                          <Text style={stylesModal.modalText}>{item.date}</Text>
                          <Text style={stylesModal.modalText}>{item.type}</Text>
                          {item.link ? (
                            <Text style={stylesModal.modalText}>
                              Appointment is Online
                            </Text>
                          ) : (
                            <></>
                          )}
                        </View>
                      )}
                    />
                    <Pressable
                      style={[stylesModal.button, stylesModal.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Close Notification</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("DoctorPatients", { userData })
                }
              >
                <Text style={styles.buttonText}>My patients</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      if (userData.role === "admin") {
        return (
          <View style={styles.container}>
            <Text style={{ marginBottom: 30 }}></Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("RegisterDoctor")}
            >
              <Text style={styles.buttonText}>Register Doctor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("AddPrices")}
            >
              <Text style={styles.buttonText}>Add New Price</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("AddInsurances")}
            >
              <Text style={styles.buttonText}>Add New Insurance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("CreateReceipt")}
            >
              <Text style={styles.buttonText}>Create New Receipt</Text>
            </TouchableOpacity>
          </View>
        );
      }
    } else {
      return <ActivityIndicator color="#0000ff" size="large" />;
    }
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <HomeContent />
      ) : (
        <ActivityIndicator color="#0000ff" size="large" />
      )}
    </View>
  );
};

const stylesModal = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
});

export default Home;

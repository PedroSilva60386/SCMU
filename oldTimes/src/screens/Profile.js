import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, {useState, useEffect} from "react";
import { app } from "../services/fireBaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authContext";
import { styles } from "../styles/styles";
import { signOut } from "../services/auth";
const Profile = () => {
  const navigation = useNavigation();
  const { currentUser, userData, setUserData } = useAuth();
  const [numRooms, setNumRooms] = useState('');
  const [numStaf, setNumStaff] = useState('');

  const handleLogOut = () => {
    signOut().then(() => {
      setUserData(null);
      navigation.navigate("FirstPage");
    });
  };
  useEffect(() => {
      const db = app.firestore();
      const unsubscribeRooms = db.collection('rooms').onSnapshot((snapshot) => {
      setNumRooms(snapshot.size);
    });
      const unsubscribeStaff = db.collection('users').where("role", "==", "staff").onSnapshot((snapshot) => {
      setNumStaff(snapshot.size);
    });
    return () => {
      unsubscribeRooms();
      unsubscribeStaff();
    };
  }, []);

  

  const ProfileContent = () => {
    if (!userData || userData === null || userData === undefined) {
      return <ActivityIndicator color="#0000ff" size="large" />;
    }
    if (userData) {
      if (userData.role === "staff") {
        return (
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={handleLogOut}>
              <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
          </View>
        );
      }
      if (userData.role === "admin") {
        return (
          <>
            <View
              style={{
                fontWeight: "bold",
                marginBottom: "100%",
                height: 50,
                width: 150,
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                shadowColor: "#7CB9E8",
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
              }}
            >
              <Text style={styles.boxText}>Staff Registered:</Text>
              <View
                style={{
                  fontWeight: "bold",
                  marginTop: 20,
                  marginBottom: "100%",
                  top: 5,
                  height: 50,
                  padding: 10,
                  alignSelf: "center",
                }}
              >
                <Text style={styles.boxText}>{numStaf}</Text>
              </View>
            </View>
            <View
              style={{
                fontWeight: "bold",
                height: 50,
                width: 150,
                bottom: "50%",
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                shadowColor: "#7CB9E8",
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                alignSelf: "center",
              }}
            >
              <Text style={styles.boxText}>Number of Rooms:</Text>
              <View
                style={{
                  fontWeight: "bold",
                  height: 50,
                  top: 20,
                  padding: 10,
                  alignSelf: "center",
                }}
              >
                <Text style={styles.boxText}>{numRooms}</Text>
              </View>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                <Text style={styles.buttonText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      }
    } else {
      return <ActivityIndicator color="#0000ff" size="large" />;
    }
  };

  return (
    <View style={styles.container}>
      <ProfileContent />
    </View>
  );
};

export default Profile;

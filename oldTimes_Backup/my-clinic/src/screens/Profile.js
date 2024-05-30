import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "../styles/styles";
import { signOut } from "../services/auth";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";

const Profile = () => {
  const navigation = useNavigation();
  const { currentUser, userData, setUserData } = useAuth();

  const handleLogOut = () => {
    signOut().then(() => {
      setUserData(null);
      navigation.navigate("FirstPage");
    });
  };

  const ProfileContent = () => {
    if (!userData || userData === null || userData === undefined) {
      return <ActivityIndicator color="#0000ff" size="large" />;
    }
    if (userData) {
      if (userData.role === "client") {
        return (
          <View style={styles.buttonView}>
             <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("UserAppointments")}
            >
              <Text style={styles.buttonText}>My Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("UserReceipts")}
            >
              <Text style={styles.buttonText}>My Receipts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Payments")}
            >
              <Text style={styles.buttonText}>Payments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogOut}>
              <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
          </View>
        );
      } else if (userData.role === "doctor") {
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
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={handleLogOut}>
              <Text style={styles.buttonText}>Log out</Text>
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
      <ProfileContent />
    </View>
  );
};

export default Profile;

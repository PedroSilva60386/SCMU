import React from "react";
import { Text } from "react-native";
import { useAuth } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/styles";
import { View, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";

const Home = () => {
  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();

  console.log(userData);

  const HomeContent = () => {
    if (userData || userData !== undefined || userData !== null) {
      if (userData.role === "admin") {
        return (
          <View style={styles.container}>
            <Text style={{ marginBottom: 30 }}></Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("RegisterStaff")}
            >
              <Text style={styles.buttonText}>Register Staff</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("RoomList")}
            >
              <Text style={styles.buttonText}>List of Rooms</Text>
            </TouchableOpacity>
          </View>
        );
      }
    } else {
      return <ActivityIndicator color="black" size="large" />;
    }
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <HomeContent />
      ) : (
        <ActivityIndicator color="black" size="large" />
      )}
    </View>
  );
};

export default Home;

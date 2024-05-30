import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";

const FirstPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Welcome to MyClinic</Text>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LogIn")}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FirstPage;

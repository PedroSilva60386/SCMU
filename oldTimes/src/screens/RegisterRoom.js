import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import { app } from "../services/fireBaseConfig";

const RegisterStaff = () => {
  const [number, setNumber] = useState();
  const [age, setAge] = useState();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const registerRoom = () => {
    setLoading(true);
    try {
      app
        .firestore()
        .collection("rooms")
        .doc(number)
        .set({
          name,
          number: parseInt(number),
          age: parseInt(age),
          // add overseer
        });
      setLoading(false);
      navigation.navigate("Home");
      alert("Room " + number + " registered with success");
    } catch (error) {
      setLoading(false);
      alert("Register error: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(name) => setName(name)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={(age) => setAge(age)}
        keyboardType="numeric"
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Room Number"
        value={number}
        onChangeText={(number) => setNumber(number)}
        keyboardType="numeric"
      ></TextInput>

      {loading ? (
        <ActivityIndicator color="#0000ff" size="large" />
      ) : (
        <View>
          <Pressable style={styles.pressable} onPress={registerRoom}>
            <Text style={styles.buttonText}>Register Room</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default RegisterStaff;

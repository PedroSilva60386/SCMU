import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import { app } from "../services/fireBaseConfig";
import { useAuth } from "../context/authContext";

const RegisterStaff = () => {
  const [number, setNumber] = useState();
  const [age, setAge] = useState();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();
  const [overseer, setOverseer] = useState("");

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
          overseer: userData.role === "staff" ? userData.email : overseer,
          motionSensor: false,
          temperatureSensor: false,
          humiditySensor: false,
        });
      setLoading(false);
      navigation.navigate("Home");
      alert("Room " + number + " registered with success");
    } catch (error) {
      setLoading(false);
      alert("Register error: " + error.message);
    }
  };

  if (userData.role === "staff") {
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
  } else {
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
        {userData.role === "admin" && (
          <TextInput
            style={styles.input}
            placeholder="Overseer"
            value={overseer}
            onChangeText={(overseer) => setOverseer(overseer)}
          ></TextInput>
        )}
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
  }
};

export default RegisterStaff;

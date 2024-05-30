import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { signUp } from "../services/auth";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/styles";
import { TextInput } from "react-native-gesture-handler";
import { app } from "../services/firebaseConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] =  useState("");
  const [height, setHeight] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");

  const [loading, setLoading] = useState("");
  

  const navigation = useNavigation();

  const doSignUp = async () => {
    setLoading(true);
    try {
      const user = await signUp(email, password);
      if (user) {
        handleAddUser("client");
      }
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'TabNavigator'}]
      });
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already used");
      } else if (error.code === "auth/weak-password") {
        alert("Weak password. Please choose a stronger password");
      } else {
        alert("Register error: " + error.message);
      }
    }
  };

  const handleAddUser = (role) => {
    app.firestore().collection("users").doc(email).set({
      name,
      email,
      gender,
      weight,
      height,
      birthDate,
      birthPlace,
      role,
      insurance: "No insurance"
    });
  };
   

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(name) => setName(name)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={(gender) => setGender(gender)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Weight (Kg) "
        value={weight}
        onChangeText={(weight) => setWeight(weight)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Height (Cm) "
        value={height}
        onChangeText={(height) => setHeight(height)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Date of birth"
        value={birthDate}
        onChangeText={(birthDate) => setBirthDate(birthDate)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Place of birth"
        value={birthPlace}
        onChangeText={(birthPlace) => setBirthPlace(birthPlace)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      ></TextInput>
      {loading ? (
        <ActivityIndicator color="#0000ff" size="large" />
      ) : (
        <View>
          <Pressable style={styles.pressable} onPress={doSignUp}>
            <Text style={styles.mainText}>Sign Up</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Register;

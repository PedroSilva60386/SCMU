import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import { app } from "../services/firebaseConfig";
import { signUp } from "../services/auth";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

const RegisterDoctor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState("");
  const [listTypes, setListTypes] = useState([
    { label: "General Consultation", value: "General Consultation" },
    { label: "Ophthalmology", value: "Ophthalmology" },
    { label: "Cardiology", value: "Cardiology" },
    { label: "Pediatric", value: "Pediatric" },
    { label: "Dermatology", value: "Dermatology" },
    { label: "Gynecology", value: "Gynecology" },
    { label: "Obstetrics", value: "Obstetrics" },
    { label: "Neurology", value: "Neurology" },
    { label: "Nutrition", value: "Nutrition" },
    { label: "Oncology", value: "Oncology" },
    { label: "Psychiatry", value: "Psychiatry" },
    { label: "Rheumatology", value: "Rheumatology" },
  ]);
  const [openTypes, setOpenTypes] = useState(false);
  const [valueTypes, setValueTypes] = useState(null);

  const navigation = useNavigation();

  const doSignUp = async () => {
    setLoading(true);
    try {
      const user = await signUp(email, password);
      if (user) {
        handleAddUser("doctor");
      }
      setLoading(false);
      navigation.navigate("Home");
      alert("Doctor " + name + " registered with success");
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
      role,
      type: valueTypes,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Doctor Info</Text>
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
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      ></TextInput>
      <DropDownPicker
        open={openTypes}
        value={valueTypes}
        items={listTypes}
        setOpen={setOpenTypes}
        setValue={setValueTypes}
        setItems={setListTypes}
        placeholder="Select the doctor's specialty"
        style={styles.dropdown}
      />
      {loading ? (
        <ActivityIndicator color="#0000ff" size="large" />
      ) : (
        <View>
          <Pressable style={styles.pressable} onPress={doSignUp}>
            <Text style={styles.mainText}>Register</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default RegisterDoctor;

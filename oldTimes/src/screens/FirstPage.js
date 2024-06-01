import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { signIn } from "../services/auth";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const FirstPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await signIn(email, password);
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "TabNavigator" }],
      });
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/invalid-credential") {
        alert("Invalid email or password");
      } else if (error.code === "auth/too-many-requests") {
        alert("Too many unsuccessful attempts. Try again later");
      } else {
        alert("Sign in error: " + error.message);
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#F5F5F5",
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: "5%",
        left: 0,
        right: 0,
      }}
    >
      <Image source={require("../../assets/old.jpg")} style={styles.image} />
      <View style={styles.header}></View>
      <View
        style={{
          flex: 1,
          justifyContent: "left",
          alignItems: "left",
          position: "absolute",
          bottom: "5%",
          left: 0,
          right: 0,
          backgroundColor: "#F5F5F5",
        }}
      >
        <Text style={styles.title}>Please login:</Text>
        <Text style={styles.inputTitle}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        ></TextInput>
        <Text style={styles.inputTitle}>Password:</Text>
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
          <Pressable style={styles.pressable} onPress={handleLogin}>
            <Text
              style={{
                position: "relative",
                fontSize: 22,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default FirstPage;

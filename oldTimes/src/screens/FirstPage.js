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

const FirstPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Add your login logic here
    setLoading(true);
    try {
      const user = await signIn(email, password);
      setLoading(false);
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
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "left",
          alignItems: "left",
          position: "absolute",
          bottom: 300,
          left: 10,
          right: 0,
          backgroundColor: "#fff",
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Email do Staff "
          value={email}
          onChangeText={(email) => setEmail(email)}
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
          </View>
        )}
      </View>
    </View>
  );
};

export default FirstPage;

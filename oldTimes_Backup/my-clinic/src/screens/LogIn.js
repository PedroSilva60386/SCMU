import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { signIn } from "../services/auth";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/styles";
import { TextInput } from "react-native-gesture-handler";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const doLogIn = async () => {
    setLoading(true);
    try {
      const user = await signIn(email, password);
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'TabNavigator'}]
      });
    } catch (error) {
      setLoading(false);
      if (
        error.code === "auth/invalid-credential"
      ) {
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
      <Text style={styles.mainText}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
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
          <Pressable style={styles.pressable} onPress={doLogIn}>
            <Text style={styles.mainText}>Login</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default LogIn;

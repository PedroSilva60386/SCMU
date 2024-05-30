import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { signIn } from "../services/auth";
import { styles } from '../styles/styles';
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";


const FirstPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleLogin = async () => {
        // Add your login logic here
        setLoading(true);
        try{
            const user = await signIn(email, password);
            setLoading(false);
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
    //     <View style={styles.container}>
    //         <TextInput
    //             style={styles.input}
    //             placeholder="Email"
    //             value={email}
    //             onChangeText={(email) => setEmail(email)}
    //         ></TextInput>
    //         <TextInput
    //             style={styles.input}
    //             placeholder="Password"
    //             value={password}
    //             onChangeText={(password) => setPassword(password)}
    //             secureTextEntry={true}
    //         ></TextInput>
    //           {loading ? (
    //             <ActivityIndicator color="#0000ff" size="large" />
    //           ) : (
    //             <View>
    //               <Pressable style={styles.pressable} onPress={handleLogin}>
    //                 <Text style={styles.mainText}>Login</Text>
    //               </Pressable>
    //             </View>
    //           )}
    //         </View>
    <Text>First Page</Text>
     );
};


export default FirstPage;
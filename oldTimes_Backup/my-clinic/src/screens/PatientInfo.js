import { View, Text } from "react-native";
import React from "react";
import { styles } from "../styles/styles";

const PatientInfo = ({ route }) => {
    const { name, email, gender, weight, height, birthDate, birthPlace} = route.params.item;
 
  return (
    <View style={styles.container}>
        <View style={styles.patiInfoButton}>
        <Text style={styles.patiInfoButtonText}>Nome: {name}</Text>
        </View>
        <View style={styles.patiInfoButton}>
        <Text style={styles.patiInfoButtonText}>Email: {email}</Text>
        </View>
        <View style={styles.patiInfoButton}>
        <Text style={styles.patiInfoButtonText}>Gender: {gender}</Text>
        </View>
        <View style={styles.patiInfoButton}>
        <Text style={styles.patiInfoButtonText}>Weight: {weight} kg</Text>
        </View>
        <View style={styles.patiInfoButton}>
        <Text style={styles.patiInfoButtonText}>Height: {height} cm</Text>
        </View>
        <View style={styles.patiInfoButton}>
        <Text style={styles.patiInfoButtonText}>Date of Birth: {birthDate}</Text>
        </View>
        <View style={styles.patiInfoButton}>
        <Text style={styles.patiInfoButtonText}>Place of Birth: {birthPlace}</Text>
        </View>
    </View>
  );
};

export default PatientInfo;

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  LogBox,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import { app } from "../services/firebaseConfig";

const AddInsurances = () => {
  LogBox.ignoreAllLogs = false;

  const navigation = useNavigation();
  const [insurances, setInsurances] = useState([]);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    app
      .firestore()
      .collection("insurances")
      .onSnapshot(
        (querySnapshot) => {
          const newInsurances = [];
          querySnapshot.forEach((doc) => {
            const { name, discount } = doc.data();
            newInsurances.push({
              name,
              discount,
              id: doc.id,
            });
          });
          newInsurances.sort((a, b) => a.name.localeCompare(b.name));
          setInsurances(newInsurances);
          setLoading(false);
        },
        (error) => {
          alert(error.message);
          setLoading(false);
        }
      );
  }, []);

  const handleAddInsurance = () => {
    if (name === "" || discount === "") {
      alert("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      app.firestore().collection("insurances").doc(name).set({
        name,
        discount,
      });
      setName("");
      setDiscount("");
      setLoading(false);
    } catch (error) {
      alert("Add error: " + error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.newPriceView}>
        <View style={styles.typeView}>
          <Text style={styles.typeText}>Name</Text>
          <TextInput
            style={styles.typeInput}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.typeView}>
          <Text style={styles.priceText}>Discount</Text>
          <TextInput
            style={styles.priceInput}
            value={discount}
            onChangeText={setDiscount}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddInsurance}>
          <Text>ADD</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.allPricesView}>
        {setLoading ? (
          <FlatList
            data={insurances}
            renderItem={({ item }) => (
              <Text style={styles.allPricesText}>
                {item.name} - {item.discount}% of discount
              </Text>
            )}
          />
        ) : (
          <ActivityIndicator color="#0000ff" size="large" />
        )}
      </View>
    </View>
  );
};

export default AddInsurances;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  newPriceView: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 10,
  },
  typeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  typeInput: {
    borderWidth: 1,
    borderColor: "gray",
    width: 200,
    height: 50,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: "gray",
    width: 130,
    height: 50,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4c00b0",
    padding: 8,
    borderRadius: 100,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    marginTop: 27,
  },
  allPricesView: {
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
  },
  allPricesText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

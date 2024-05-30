import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import { app } from "../services/firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";

const AddPrices = () => {
  const navigation = useNavigation();
  const [prices, setPrices] = useState([]);
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    app
      .firestore()
      .collection("prices")
      .onSnapshot(
        (querySnapshot) => {
          const newPrices = [];
          querySnapshot.forEach((doc) => {
            const { type, price } = doc.data();
            newPrices.push({
              type,
              price,
              id: doc.id,
            });
          });
          //newPrices.sort((a, b) => a.type.localeCompare(b.type));
          newPrices.sort((a, b) => a.price - b.price);
          setPrices(newPrices);
          setLoading(false);
        },
        (error) => {
          alert(error.message);
          setLoading(false);
        }
      );
  }, []);

  const handleAddPrice = () => {
    if (type === "" || price === "") {
      alert("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      app.firestore().collection("prices").doc(type).set({
        type,
        price,
      });
      setPrice("");
      setType("");
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
          <Text style={styles.typeText}>Type</Text>
          <TextInput
            style={styles.typeInput}
            value={type}
            onChangeText={setType}
          />
        </View>
        <View style={styles.typeView}>
          <Text style={styles.priceText}>Price</Text>
          <TextInput
            style={styles.priceInput}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPrice}>
          <MaterialIcons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.allPricesView}>
        {setLoading ? (
          <FlatList
            data={prices}
            renderItem={({ item }) => (
              <Text style={styles.allPricesText}>
                {item.type} - {item.price}€
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

export default AddPrices;

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

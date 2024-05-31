import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  input: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    height: 50,
    alignSelf: "center",
    width: "95%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },

  button: {
    backgroundColor: "#7CB9E8",
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
    width: 250,
  },

  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },

  pressable: {
    backgroundColor: "#7CB9E8",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    width: "95%",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
    alignItems: "center",
  },

  mainText: {
    position: "relative",
    fontSize: 22,
    fontWeight: "bold",
  },

  inputTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 1,
    marginBottom: 1,
    alignSelf: "left",
    marginLeft: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 1,
    marginBottom: 10,
    alignSelf: "left",
    marginLeft: 10,
    color: "#6699CC",
  },
});

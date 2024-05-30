import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "fff",
  },
  mainText: {
    position: "relative",
    fontSize: 22,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
    width: 250,
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  buttonView: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "97%",
    marginTop: 100,
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    width: "97%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  pressable: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
    alignItems: "center",
  },
  tinyLogo: {
    width: 30,
    height: 30,
    borderRadius: 25, // Add a border radius to make it circular
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centerText: {
    textAlign: "center",
  },
  dateButton: {
    padding: 5,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 10,
  },
  textBox: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    height: 150,
    width: "97%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  dropdown: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    width: "97%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  checkInContainer: {
    flex: 1,
    backgroundColor: "fff",
  },
  boxView: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
    alignItems: "center",
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  boxDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  box: {
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    height: 80, // Altura da caixa, ajuste conforme necessário
    width: 300, // Largura da caixa, ajuste conforme necessário
    borderColor: '#000', // Cor da borda, ajuste conforme necessário
    borderWidth: 1, // Largura da borda, ajuste conforme necessário
    borderRadius: 5,
    marginVertical: 5, // Margem vertical entre as caixas

  },
  text: {
    textAlign: 'center', // Centraliza o texto horizontalmente
    fontWeight: "bold",
  },
  patiButton: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 10,
    alignItems: "right",
    width: '20%', // Largura do botão ajustada para 80% da largura da caixa
    marginLeft: 120,
  },
  patiButtonText: {
    color: '#fff', // Cor do texto do botão
    fontWeight: 'bold', // Estilo de fonte negrito
  },
  patiInfoButton: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 10,
    alignItems: "right",
    width: '60%', // Largura do botão ajustada para 80% da largura da caixa
    marginBottom: 30,
  },
  patiInfoButtonText: {
    color: '#fff', // Cor do texto do botão
    fontWeight: 'bold', // Estilo de fonte negrito
  },
  topLeftText: {
    margin: 10,
  },
  containerHome: {
    flex: 1,
    position: 'relative', // Ensure the container is a positioning context
  },
  topLeftContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  bold: {
    fontWeight: 'bold',
  },
});

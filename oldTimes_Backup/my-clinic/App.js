import React, { useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import Header from "./src/components/Header";
import FirstPage from "./src/screens/FirstPage";
import LogIn from "./src/screens/LogIn";
import Register from "./src/screens/Register";
import MedicalAppointment from "./src/screens/MedicalAppointment";
import MedicalExam from "./src/screens/MedicalExam";
import CheckIn from "./src/screens/CheckIn";
import Profile from "./src/screens/Profile";
import RegisterDoctor from "./src/screens/RegisterDoctor";
import AddPrices from "./src/screens/AddPrices";
import AddInsurances from "./src/screens/AddInsurances";
import DoctorPatients from "./src/screens/DoctorPatients";
import CreateReceipt from "./src/screens/CreateReceipt";
import PatientInfo from "./src/screens/PatientInfo";
import Payments from "./src/screens/Payments";
import UserAppointments from "./src/screens/UserAppointments";
import AutoTriage from "./src/screens/AutoTriage";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "./src/contexts/authContext";
import UserReceipts from "./src/screens/UserReceipts";

LogBox.ignoreAllLogs(true);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={FirstPage}
        name="FirstPage"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Register}
        name="Register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={LogIn}
        name="LogIn"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={TabNavigator}
        name="TabNavigator"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          headerTitle: () => <Header name="MyClinic" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarActiveTintColor: "#000000",
          tabBarIcon: () => {
            return <Ionicons name="home" size={30} color="#874FFF" />;
          },
        }}
      />
      <Tab.Screen
        component={Profile}
        name="Profile"
        options={{
          headerTitle: () => <Header name="MyClinic" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarActiveTintColor: "#000000",
          tabBarIcon: () => {
            return <Ionicons name="person" size={30} color="#874FFF" />;
          },
        }}
      />
      <Tab.Screen
        component={MedicalAppointment}
        name="MedicalAppointment"
        options={{
          headerTitle: () => <Header name="MyClinic" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        component={MedicalExam}
        name="MedicalExam"
        options={{
          headerTitle: () => <Header name="MyClinic" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        component={CheckIn}
        name="CheckIn"
        options={{
          headerTitle: () => <Header name="MyClinic" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        component={RegisterDoctor}
        name="RegisterDoctor"
        options={{
          headerTitle: () => <Header name="MyClinic" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        component={AddInsurances}
        name="AddInsurances"
        options={{
          headerTitle: () => <Header name="MyClinic" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        component={AddPrices}
        name="AddPrices"
        options={{
          headerTitle: () => <Header name="Prices" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        component={CreateReceipt}
        name="CreateReceipt"
        options={{
          headerTitle: () => <Header name="Create New Receipt" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        component={DoctorPatients}
        name="DoctorPatients"
        options={{
          headerTitle: () => <Header name="Patients" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        component={PatientInfo}
        name="PatientInfo"
        options={{
          headerTitle: () => <Header name="Patient Information" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        component={Payments}
        name="Payments"
        options={{
          headerTitle: () => <Header name="Payments" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        component={UserReceipts}
        name="UserReceipts"
        options={{
          headerTitle: () => <Header name="My Receipts" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        component={UserAppointments}
        name="UserAppointments"
        options={{
          headerTitle: () => <Header name="My Appointments" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        component={AutoTriage}
        name="AutoTriage"
        options={{
          headerTitle: () => <Header name="MyClinic" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

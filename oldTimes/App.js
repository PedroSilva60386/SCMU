import { StyleSheet, Text, View, StatusBar } from "react-native";
import { AuthProvider, useAuth } from "./src/context/authContext";
import { createStackNavigator } from "@react-navigation/stack";
import FirstPage from "./src/screens/FirstPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Header from "./src/components/Header";
import Home from "./src/screens/Home";
import { Ionicons } from "@expo/vector-icons";
import RegisterStaff from "./src/screens/RegisterStaff";
import RoomList from "./src/screens/RoomList";
import Profile from "./src/screens/Profile";
import RegisterRoom from "./src/screens/RegisterRoom";
import StaffList from "./src/screens/StaffList";
import RoomInfo from "./src/screens/RoomInfo";

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
          headerShown: true,
          headerTitle: () => <Header name="Old Times" />,
          headerStyle: {
            backgroundColor: "#7CB9E8",
            height: 120,
          },
        }}
      />
      <Stack.Screen
        component={RoomList}
        name="RoomList"
        options={{
          headerShown: true,
          headerTitle: () => <Header name="Old Times" />,
          headerStyle: {
            backgroundColor: "#7CB9E8",
            height: 120,
          },
        }}
      />
      <Stack.Screen
        component={StaffList}
        name="StaffList"
        options={{
          headerShown: true,
          headerTitle: () => <Header name="Old Times" />,
          headerStyle: {
            backgroundColor: "#7CB9E8",
            height: 120,
          },
        }}
      />
      <Stack.Screen
        component={RegisterStaff}
        name="RegisterStaff"
        options={{
          headerShown: true,
          headerTitle: () => <Header name="Old Times" />,
          headerStyle: {
            backgroundColor: "#7CB9E8",
            height: 120,
          },
        }}
      />
      <Stack.Screen
        component={RegisterRoom}
        name="RegisterRoom"
        options={{
          headerShown: true,
          headerTitle: () => <Header name="Old Times" />,
          headerStyle: {
            backgroundColor: "#7CB9E8",
            height: 120,
          },
        }}
      />
      <Stack.Screen
        component={TabNavigator}
        name="TabNavigator"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={RoomInfo}
        name="RoomInfo"
        options={{
          headerShown: true,
          headerTitle: () => <Header name="Old Times" />,
          headerStyle: {
            backgroundColor: "#7CB9E8",
            height: 120,
          },
        }}
      />
    </Stack.Navigator> // Add the closing tag for the 'Stack.Navigator' component
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          headerTitle: () => <Header name="Old Times" />,
          headerStyle: {
            backgroundColor: "#7CB9E8",
            height: 120,
          },
          tabBarActiveTintColor: "#000000",
          tabBarIcon: () => {
            return <Ionicons name="home" size={30} color="#7CB9E8" />;
          },
        }}
      />
      <Tab.Screen
        component={Profile}
        name="Profile"
        options={{
          headerTitle: () => <Header name="Old Times" />,
          headerStyle: {
            backgroundColor: "#7CB9E8",
            height: 120,
          },
          tabBarActiveTintColor: "#000000",
          tabBarIcon: () => {
            return <Ionicons name="person" size={30} color="#7CB9E8" />;
          },
        }}
      />
    </Tab.Navigator>
  ); // Add the closing tag for the 'Tab.Navigator' component
};

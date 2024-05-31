import { StyleSheet, Text, View, StatusBar } from "react-native";
import { AuthProvider, useAuth } from "./src/context/authContext";
import { createStackNavigator } from "@react-navigation/stack";
import FirstPage from "./src/screens/FirstPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Header from "./src/components/Header";
import Home from "./src/screens/Home";
import { Ionicons } from "@expo/vector-icons";

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
        component={TabNavigator}
        name="TabNavigator"
        options={{
          headerShown: false,
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
            return <Ionicons name="home" size={30} color="#874FFF" />;
          },
        }}
      />
    </Tab.Navigator>
  ); // Add the closing tag for the 'Tab.Navigator' component
};

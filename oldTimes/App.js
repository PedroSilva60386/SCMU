import { StyleSheet, Text, View, StatusBar } from "react-native";
import { AuthProvider, useAuth } from "./src/context/authContext";
import { createStackNavigator } from "@react-navigation/stack";
import FirstPage from "./src/screens/FirstPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
    </Stack.Navigator> // Add the closing tag for the 'Stack.Navigator' component
  );
};

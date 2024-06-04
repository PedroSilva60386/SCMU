import { View, Text, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import React, {useState, useEffect} from "react";
import { app } from "../services/fireBaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authContext";
import { styles } from "../styles/styles";
import { signOut } from "../services/auth";
const Profile = () => {
  const navigation = useNavigation();
  const { currentUser, userData, setUserData } = useAuth();
  const [numRooms, setNumRooms] = useState('');
  const [numStaf, setNumStaff] = useState('');
  const [username, setUsername] = useState(userData.username);
  const [role, setRole] = useState(userData.role);
  const [email, setEmail] = useState(userData.email);

  const handleLogOut = () => {
    signOut().then(() => {
      setUserData(null);
      navigation.navigate("FirstPage");
    });
  };
  useEffect(() => {
      const db = app.firestore();
      const unsubscribeRooms = db.collection('rooms').onSnapshot((snapshot) => {
      setNumRooms(snapshot.size);
    });
      const unsubscribeStaff = db.collection('users').where("role", "==", "staff").onSnapshot((snapshot) => {
      setNumStaff(snapshot.size);
    });
    return () => {
      unsubscribeRooms();
      unsubscribeStaff();
    };
  }, []);

  const updateUserData = async () => {
    try {
      await firebase
        .database()
        .ref('users/' + email)
        .update({ username, role, email });
    } catch (error) {
      console.error(error);
    }
  };

  

  const ProfileContent = () => {
    if (!userData) {
      return <ActivityIndicator color="#0000ff" size="large" />;
    }
  
    const commonStyles = {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5', // Light grey background for the whole page
      },
      box: {
        backgroundColor: '#ffffff', // White background for the text boxes
        borderRadius: 10,
        padding: 20,
        margin: 10,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000', // Adding shadow for a 3D effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      text: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold', // Making the text bold
      },
      button: {
        backgroundColor: '#0000ff',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
      },
    };
  
    return (
      <View style={commonStyles.container}>
        <View style={commonStyles.box}>
          <Text style={commonStyles.text}>Name:</Text>
          <TextInput
          style={commonStyles.text}
          value={username}
          onChangeText={setUsername}
      />
        </View>
        <View style={commonStyles.box}>
          <Text style={commonStyles.text}>Role:</Text>
          <TextInput
          style={commonStyles.text}
          value={role}
          onChangeText={setRole}
      />
        </View>
        <View style={commonStyles.box}>
          <Text style={commonStyles.text}>Email:</Text>
          <TextInput
          style={commonStyles.text}
          value={email}
          onChangeText={setEmail}
      />
        </View>
  
        {userData.role === "staff" && (
          <TouchableOpacity style={commonStyles.button} onPress={handleLogOut}>
            <Text style={commonStyles.buttonText}>Log out</Text>
          </TouchableOpacity>
        )}
  
        {userData.role === "admin" && (
          <>
            <View style={commonStyles.box}>
              <Text style={commonStyles.text}>Staff Registered: {numStaf}</Text>
            </View>
            <View style={commonStyles.box}>
              <Text style={commonStyles.text}>Number of Rooms: {numRooms}</Text>
            </View>
            <TouchableOpacity style={commonStyles.button} onPress={handleLogOut}>
              <Text style={commonStyles.buttonText}>Log out</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    ) || <ActivityIndicator color="#0000ff" size="large" />;
  };

  return (
    <View style={styles.container}>
      <ProfileContent />
    </View>
  );
};

export default Profile;

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../context/authContext";

const RoomInfo = () => {
  const [roomInfo, setRoomInfo] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedRoom } = route.params;

  useEffect(() => {
    // Fetch room information based on selectedRoom

    const fetchRoomInfo = async (roomId) => {
      try {
        const roomData = await firebase
          .firestore()
          .collection("rooms")
          .doc(roomId)
          .get();
        setRoomInfo(roomData.data());
      } catch (error) {
        console.error("Error fetching room information:", error);
      }
    };

    if (selectedRoom) {
      fetchRoomInfo(selectedRoom);
    }
  }, [selectedRoom]);

  return (
    <View>
      <Text>Room Name: {roomInfo?.name}</Text>
      <Text>Room Capacity: {roomInfo?.age}</Text>
      {/* Render other room information */}
    </View>
  );
};

export default RoomInfo;

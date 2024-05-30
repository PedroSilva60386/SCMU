import { View, Text } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", alignSelf: 'center' }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 30, color: "white", textAlign: 'center' }}>
        {props.name}
      </Text>
    </View>
  );
};

export default Header
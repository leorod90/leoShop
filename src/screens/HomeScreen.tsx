import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  return (
    <View>
      <MaterialCommunityIcons name="home" color={'red'} size={50} />
    </View>
  )
}
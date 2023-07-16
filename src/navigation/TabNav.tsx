import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';

export type TabProps = {
  Home: undefined;
  Cart: undefined;
  Payment: undefined;
  Profile: undefined;
}

const Tab = createBottomTabNavigator<TabProps>();

export default function TabNav() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={ExampleScreen} />
      <Tab.Screen name="Payment" component={ExampleScreen} />
      <Tab.Screen name="Profile" component={ExampleScreen} />
    </Tab.Navigator>
  );
}

import { View, Text } from 'react-native'
import React from 'react'

const ExampleScreen = () => {
  return (
    <View>
      <Text>TabNav</Text>
    </View>
  )
}
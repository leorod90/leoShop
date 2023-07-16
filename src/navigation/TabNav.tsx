import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';

export type TabProps = {
  Home: undefined;
  Cart: undefined;
  Payment: undefined;
  Profile: undefined;
}

const Tab = createBottomTabNavigator<TabProps>();

export default function TabNav() {
  const { tabBarActiveTintColor, tabBarInactiveTintColor } = useThemeColors()

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor,
      tabBarInactiveTintColor,
    }} >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Cart" component={ExampleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart-outline" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Payment" component={ExampleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cash-outline" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Profile" component={ExampleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  );
}

import { View, Text } from 'react-native'
import React from 'react'
import useThemeColors from '../themes/useThemeColors';

const ExampleScreen = () => {
  return (
    <View>
      <Text>TabNav</Text>
    </View>
  )
}
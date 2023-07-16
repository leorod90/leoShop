import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNav, { TabProps } from './TabNav';

export type StackProps = {
  Tab: NavigatorScreenParams<TabProps>;
  Details: undefined;
}

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Tab" component={TabNav} />
      <Stack.Screen name="Details" component={ExampleScreen} />
    </Stack.Navigator>
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
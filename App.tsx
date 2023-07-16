/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainNav';

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

export default App;

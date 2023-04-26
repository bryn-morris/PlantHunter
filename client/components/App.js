import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState} from 'react'

import Loggies from './Loggies';
import OpeningPage from './OpeningPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function App() {

  const Stack = createNativeStackNavigator()

  return (   
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Loggies'
        screenOptions={{
          gestureEnabled : true,
          gestureDirection: 'vertical',          
        }}
      >
        <Stack.Screen name = 'OpeningPage' component={OpeningPage}/>
        <Stack.Screen name = 'Loggies' component = {Loggies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
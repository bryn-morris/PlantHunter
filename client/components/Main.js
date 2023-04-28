import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useEffect, useContext } from "react";
import OpeningPage from './OpeningPage';
import HomeContainer from './HomeContainer';
import Loggies from './Login and Auth/Loggies';
import { AuthContext } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';


function Main () {

    const Stack = createNativeStackNavigator()

    const { setUserToken } = useContext(AuthContext)

    useEffect(()=>{
        async function tokenOnStart() {
            setUserToken(await SecureStore.getItemAsync('token'))
        }
        tokenOnStart()
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='OpeningPage'
            >
                <Stack.Screen name = 'OpeningPage' component={OpeningPage} />
                <Stack.Screen name = 'HomeContainer' component={HomeContainer} /> 
                <Stack.Screen name = 'Loggies' component = {Loggies} />
            </Stack.Navigator>
      </NavigationContainer>
    )

}

export default Main
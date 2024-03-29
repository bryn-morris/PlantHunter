import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useEffect, useContext } from "react";
import OpeningPage from './OpeningPage';
import AppContainer from './AppContainer';
import Loggies from './Login and Auth/Loggies';
import { AuthContext } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';


function Main () {

    const Stack = createNativeStackNavigator()

    const { setUserToken } = useContext(AuthContext)

    ////////////////////////////////////////////////
    ///////  Set JWT on Start of App
    ////////////////////////////////////////////////

    useEffect(()=>{
        async function tokenOnStart() {
            setUserToken(await SecureStore.getItemAsync('token'))
        }
        tokenOnStart()
    }, [])

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='OpeningPage'>
                    <Stack.Screen name = 'OpeningPage' component={OpeningPage} options={{ headerShown: false }}/>
                    <Stack.Screen name = 'AppContainer' component={AppContainer} options={{ headerShown: false }}/> 
                    <Stack.Screen name = 'Loggies' component = {Loggies} options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>      
    )

}

export default Main
import {View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlantDetails from './PlantDetails'
import Index from './Index';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function IndexStack() {

    const Stack = createNativeStackNavigator()

    const { userToken } = useContext(AuthContext)

    useEffect( ()=> {
        console.log('firing index use effect')
        fetch ('https://ca72-174-74-7-135.ngrok-free.app/plantsbyuser', {
            method: "GET",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            }
        })
            .then(r=>r.json())
            .then(console.log)
        //handle response
    }
    ,[])
    
    return (
        <Stack.Navigator initialRouteName='PlantDetails'>
            <Stack.Screen name = 'Index' component = {Index} />
            <Stack.Screen name = 'PlantDetails' component = {PlantDetails} />
        </Stack.Navigator>
    )

}

export default IndexStack  
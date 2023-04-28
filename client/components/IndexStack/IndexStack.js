import {View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlantDetails from './PlantDetails'
import Index from './Index';

function IndexStack() {

    const Stack = createNativeStackNavigator()
    
    return (
        <Stack.Navigator initialRouteName='Index'>
            <Stack.Screen name = 'Index' component = {Index} />
            <Stack.Screen name = 'PlantDetails' component = {PlantDetails} />
        </Stack.Navigator>
    )

}

export default IndexStack  
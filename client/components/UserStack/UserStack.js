import {View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './UserProfile'
import UserGallery from './UserGallery'

function UserStack() {

    const Stack = createNativeStackNavigator()
    
    return (
        <Stack.Navigator initialRouteName='UserProfile' >
            <Stack.Screen name = 'UserProfile' component = {UserProfile} />
            <Stack.Screen name = 'UserGallery' component = {UserGallery} />
        </Stack.Navigator>
    )

}

export default UserStack 
import {View, Text, Button} from 'react-native'
import { useContext } from "react";
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../context/AuthContext';

//Settings Icon to have user be able to update and change their settings
// Logout functionality should be included, Delete Account

function MyProfile({navigation}) {
    
    const { setUserToken } = useContext(AuthContext)

    async function handleLogout() {
        try{
            await SecureStore.deleteItemAsync('token')
            setUserToken(null)
            navigation.popToTop()
        } catch (error){
            console.log(error)
        }
    }

    return(
        <View>
            <Button title="LogOut" onPress={handleLogout}/>
            <Text>Profile Page</Text>
        </View>
        
    
)

}

export default MyProfile  
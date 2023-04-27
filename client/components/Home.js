import { useContext } from "react";
import { View, Button, Text } from "react-native"
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from "../context/AuthContext";

function Home({navigation}) {

    //Logout function - move around after routing has been better established

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
            <Text> Is This Working?</Text>
            <Button
                title = 'logout'
                onPress={handleLogout}
            />
        </View>
    )
    
}

export default Home  
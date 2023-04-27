
import { View, Button } from "react-native"
import * as SecureStore from 'expo-secure-store';

function Home() {

    //Logout function - move around after routing has been better established

    function handleLogout() {
        try{
            SecureStore.deleteItemAsync('token')
        // Redirect the user to the login page, possibly:
        // navigation.navigate('Login');
        } catch (error){
            console.log(error)
        }
        
    }

    return(
        <View>
            {/* <Button onPress={handleLogout}/> */}
        </View>
    )
    
}

export default Home  
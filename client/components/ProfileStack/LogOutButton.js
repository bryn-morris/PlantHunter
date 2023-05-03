import { Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as SecureStore from 'expo-secure-store';


function LogOutButton ({navigation}) {

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
        <Button title="LogOut" onPress={handleLogout}/>
    )
}

export default LogOutButton
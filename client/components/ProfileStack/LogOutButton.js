import { Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as SecureStore from 'expo-secure-store';


function LogOutButton ({navigation}) {

    const { setUserToken } = useContext(AuthContext)

    ////////////////////////////////////////////////
    ///////  LogOut Button Logic
    ////////////////////////////////////////////////

    // Possible Opportnity for refactor between this
    // code and the LogOutModal Logic

    async function handleLogout() {
        try{
            await SecureStore.deleteItemAsync('token')
            setUserToken(null)
            navigation.popToTop()
        } catch (error){
            console.log(error)
        }
    }

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <Button title="LogOut" onPress={handleLogout}/>
    )
}

export default LogOutButton
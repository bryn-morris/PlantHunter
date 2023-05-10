import { StyleSheet, TouchableOpacity, Text } from "react-native";
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
        <TouchableOpacity
                style = {styles.buttonContainer}
                onPress = {handleLogout}
            >
                <Text style = {{...styles.buttonText, fontFamily: 'braah-one'}}>Log Out</Text>
            </TouchableOpacity>
    )
}

export default LogOutButton

const styles = StyleSheet.create({

    buttonContainer:{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#d5ceae',
        elevation: 5,
        right:10,
        bottom:0,
    },
    buttonIcon: {

    },
    buttonText: {
        color: '#4a7c59',
        fontSize: 18,
        fontWeight: 'bold'
    },

})
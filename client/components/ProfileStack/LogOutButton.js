import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';


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
                <AntDesign name="logout" style = {styles.buttonIcon}  />
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
        borderRadius: 35,
        backgroundColor: '#d5ceae',
        elevation: 5,
        height:70,
        width:70,
        right:30,
        bottom:-30,
    },
    buttonIcon: {
        fontSize: 24,
        color: "#4a7c59",
    },
    buttonText: {
        color: '#4a7c59',
        fontSize: 12,
        fontWeight: 'bold'
    },

})
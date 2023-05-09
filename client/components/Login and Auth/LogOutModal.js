import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as SecureStore from 'expo-secure-store'


function LogOutModal({navigation}) {

    const { setUserToken, logOutModalVisible, setLogOutModalVisible } = useContext(AuthContext)

    ////////////////////////////////////////////////
    ///////  Logout Function 
    ////////////////////////////////////////////////

    async function handleLogout() {
        try{
            setLogOutModalVisible(false);
            await SecureStore.deleteItemAsync('token');
            setUserToken(null);
            navigation.popToTop();
        } catch (error){
            console.log(error)
        }
    }

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <Modal
                visible={logOutModalVisible}
                animationType="slide"
                onRequestClose={() => setLogOutModalVisible(false)}
                transparent={true}
            >
                <View style = {styles.modalInfoContainer}>
                    <Text style = {styles.modalTitle}>Your login has expired!</Text>
                    <Text style = {styles.modalBody}>Please Click the button below to Login Again!</Text>
                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity 
                                onPress={handleLogout}
                                style = {styles.modalButton}
                        >
                            <Text style = {styles.modalButtonText}>LogOut</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
        </Modal>
    )
}

export default LogOutModal

////////////////////////////////////////////////
///////  Styling
////////////////////////////////////////////////

const styles = StyleSheet.create({

    modalInfoContainer:{
        backgroundColor: '#fafcee',
        alignItems: 'center',
        justifyContent: 'center',
        height: "20%",
        top:  "30%",
        borderRadius: 50,
    },
    modalTitle:{
        position: 'absolute',
        fontFamily: 'braah-one',
        top: 0,
        color: '#4e372c',
        fontSize: 30,
        transform: [{scaleY:1.2}],
        paddingBottom: 40,
        paddingTop: 10,
    },
    modalBody: {
        paddingTop:20,
        color: '#4a7c59',
        fontSize: 14,
        fontWeight: 'bold'
    },
    buttonContainer:{
        height: 40,
        width: "50%",
        top:170,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButton: {
        position: 'absolute',
        bottom: 150,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#4e372c',
        width:"100%",
    },
    modalButtonText: {
        color: '#ffbf00',
        fontSize: 18,
        fontWeight: 'bold'
    },
})
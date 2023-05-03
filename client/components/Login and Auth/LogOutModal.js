import { View, Text, Modal, Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as SecureStore from 'expo-secure-store'


function LogOutModal({navigation, logOutModalVisible, setLogOutModalVisible}) {

    const { setUserToken } = useContext(AuthContext)

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

    return(
        <Modal
                visible={logOutModalVisible}
                animationType="slide"
                onRequestClose={() => setLogOutModalVisible(false)}
            >
                <View>
                    <Text>Looks like your login has expired!</Text>
                    <Text>Please Click the button below to Login Again!</Text>
                    <Button 
                        onPress = {handleLogout}
                        title= "LogOut"
                    />
                </View>
        </Modal>
    )

}

export default LogOutModal
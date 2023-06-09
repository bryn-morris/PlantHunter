import { View, TouchableOpacity, Text, Modal } from "react-native";


function VerificationModal({modalVisible, recentError, setModalVisible}){

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    <Text>{recentError}</Text>
                </View>
        </Modal>
    )
}

export default VerificationModal


//STYLE: Modal reconfigure so it is only part of the screen, maybe instead of
           // attaching to button
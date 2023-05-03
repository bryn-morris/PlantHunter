import { View, TouchableOpacity, Text, Modal } from "react-native";

function VerificationModal({modalVisible, recentError, setModalVisible}){

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
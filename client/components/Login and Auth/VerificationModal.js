import { View, TouchableOpacity, Text, Modal, StyleSheet } from "react-native";


function VerificationModal({modalVisible, recentError, setModalVisible}){

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
                transparent={true}
            >
                <View style = {styles.modalInfoContainer}>
                    <Text style = {styles.modalTitle}>Please Try Again!</Text>
                    <Text style = {styles.modalBody}>{recentError}</Text>
                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity 
                            onPress={() => setModalVisible(false)}
                            style = {styles.modalButton}
                        >
                            <Text style = {styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </Modal>  
    )
}

export default VerificationModal

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
});
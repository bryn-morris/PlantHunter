import { 
    View, 
    TouchableOpacity, 
    StyleSheet,
    Text,
} from "react-native"
import PlantUsers from '../PlantDetailsModals/PlantUsers';


function UserButton ({setModalVisible, modalVisible, specificPlant}) {

    userModalPropsObj = {
        modalVisible: modalVisible,
        setModalVisible: setModalVisible,
        specificPlant: specificPlant,
    }

    return (
        <>
            <TouchableOpacity 
                onPress={()=>setModalVisible(true)}
                style = {styles.usersButton}
            >
            <View style = {styles.usersContainer}>
                <Text
                    style = {styles.usersButtonText}
                >
                    Users' Comments
                </Text>
            </View>  
            </TouchableOpacity>
            <PlantUsers {...userModalPropsObj}/>
        </>
    )
}

export default UserButton

const styles = StyleSheet.create({

    usersContainer:{
        height: 30,
        width: "100%",
        borderRadius:15,
        alignItems:"center",
        justifyContent:"center",
        elevation: 5,
    },
    usersButton: {
        backgroundColor: "#4e372c",
        borderRadius:15,
        width: "80%",
    },
    usersButtonText:{
        color: '#ffbf00',
        fontSize: 18,
        fontWeight: 'bold'
    },

})
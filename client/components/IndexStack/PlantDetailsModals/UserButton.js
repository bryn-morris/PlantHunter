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
        <View style = {styles.usersContainer}>
            <TouchableOpacity 
                onPress={()=>setModalVisible(true)}
                style = {styles.usersButton}
            >
                <Text
                    style = {styles.usersButtonText}
                >
                    User Reviews
                </Text>
            </TouchableOpacity>
            <PlantUsers {...userModalPropsObj}/>
        </View>
    )
}

export default UserButton

const styles = StyleSheet.create({

    usersContainer:{
        height: 30,
        width: 30,
        borderRadius:15,
        borderWidth:2,
        borderColor:"black",
        alignItems:"center",
        justifyContent:"center",
    },
    usersButton: {

    },
    usersButtonText:{
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },

})
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
                    User Reviews
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
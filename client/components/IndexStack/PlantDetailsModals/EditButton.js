import { 
    View, 
    TouchableOpacity, 
    StyleSheet,
} from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import EditModal from './EditModal';

function EditButton ({setEditModalVisible}) {

    return (
        <View style = {styles.editContainer}>
            <TouchableOpacity 
                onPress={()=>setEditModalVisible(true)}
                style = {styles.editButton}
            >
                <MaterialIcons name="edit"
                    style = {styles.editIcon} 
                />
            </TouchableOpacity>
            <EditModal {...editModalPropsObj}/>
        </View>
    )
}

export default EditButton

const styles = StyleSheet.create({

    editContainer:{
        height: 30,
        width: 30,
        borderRadius:15,
        borderWidth:2,
        borderColor:"black",
        alignItems:"center",
        justifyContent:"center",
    },
    editIcon: {
        fontSize: 20,
        color: "black",
        top: "10%",
    },
    editButton: {

    },
    editButtonText:{
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },

})
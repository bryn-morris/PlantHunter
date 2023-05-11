import { 
    Modal, 
    TextInput, 
    TouchableOpacity, 
    Text, 
    StyleSheet,
    Dimensions,
    View,
} from "react-native"
import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { PlantContext } from "../../../context/PlantContext"
import LogOutModal from "../../Login and Auth/LogOutModal"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFormik } from 'formik'
import * as yup from 'yup'


function EditModal ({navigation, editModalVisible, setEditModalVisible, specificPlant }) {

    const { userToken, logOutModalVisible, setLogOutModalVisible } = useContext(AuthContext)
    const { userPlants, setUserPlants } = useContext(PlantContext)
    const [ isError, setIsError ] = useState(null)
    const {width, height} = Dimensions.get('screen')

    // test formik on edit modal
    // need to fix bugs with the close modal button
    // add gesture handling to close edit modal
    // fix modal to swipe out of bottom right
    // make sure images are appropriately sized when uploaded

    ////////////////////////////////////////////////
    ///////   Patch to Plant Details
    ////////////////////////////////////////////////

    const editDetailsFormSchema = yup.object().shape({
        uri : yup.string().url('Invalid URL')
    });

    const formik = useFormik({
        initialValues: {
            image: '',
        },
        validationSchema: editDetailsFormSchema,
        onSubmit: (values) => { 
            fetch (`https://customngrok.ngrok.app/plantsbyuser/${specificPlant.id}`,{
            method: "PATCH",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            },
            body: JSON.stringify(values)
            })
            .then(r=>r.json())
            .then(updatedPlant=>{
                setUserPlants(
                    userPlants.map((eachPlant)=>{
                        if (eachPlant.id == updatedPlant.id){
                            return updatedPlant
                        } else{
                            return eachPlant
                        }
                    }))
                setEditModalVisible(false)
                }
            )
            .catch(error => {
                if (error.response.status === 404){
                    setIsError(true);
                    setTimeout(()=>{
                        setIsError(false)},3000)
                }
                if (error.response.status === 401){
                    setLogOutModalVisible(true)
                }
            })
        }
    });

    ////////////////////////////////////////////////
    ///////  Props Objects
    ////////////////////////////////////////////////

    const logOutModalPropsObj = {
        navigation: navigation,
    }

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <View style = {styles.outerModalContainer}>
            <Modal
                visible={editModalVisible}
                animationType="slide"
                onRequestClose={()=> setEditModalVisible(false)}
                transparent = {true}
            >
                <View style = {
                    {
                        ...styles.innerModalContainer,
                        width: width*4,
                        height: width*4,
                        borderRadius: width*2,
                    }
                }>
                    
                    <View style = {
                        {
                            ...styles.imageInputGroup,
                            width: width*.58,
                        }
                    }>
                        <TextInput 
                            placeholder='New Image URL'
                            onChangeText={formik.handleChange('image')}
                            value = {formik.values.image}
                            style = {styles.imageInput}
                        />
                        {formik.touched.uri && formik.errors.uri && (
                            <Text style={{ color: 'red' }}>{formik.errors.image}</Text>
                        )}
                        {isError ? 
                            <Text style={{ color: 'red' }}>Plant not Found!</Text> : null
                        }
                    </View>
                    <View style = {
                        {
                            ...styles.submitContainer,
                            width: width*.7,
                        }
                    }>
                        <TouchableOpacity
                            onPress = {formik.handleSubmit}
                            style = {styles.submitButton}
                        >
                            <Text style = {styles.buttonText}>Submit Your Changes</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                        key={specificPlant.id}
                        style = {styles.closeEditContainer}
                        onPress={()=>setEditModalVisible(false)}
                    >
                        <MaterialCommunityIcons 
                            name="pencil-remove"
                            style = {styles.closeEditIcon}
                            
                        />
                    </TouchableOpacity>
                    <MaterialCommunityIcons 
                        name="flower-tulip"
                        style = {
                            {
                                ...styles.editModalIcons,
                                color: "#73d2de",
                            }
                        } 
                    />
                    <MaterialCommunityIcons 
                        name="flower-tulip" 
                        style = {
                            {
                                ...styles.editModalIcons,
                                left: "12.5%",
                                color: "#8f2d56",
                            }
                        } 
                    />
                    <MaterialCommunityIcons 
                        name="flower-tulip" 
                        style = {
                            {
                                ...styles.editModalIcons,
                                fontSize: 150,
                                top: "40%",
                                left: "3%",
                                color: "#ffbc42",
                            }
                        } 
                    />
                    <MaterialCommunityIcons 
                        name="flower-tulip" 
                        style = {
                            {
                                ...styles.editModalIcons,
                                left: "9%",
                                color: "#5c415d",
                            }
                        } 
                    />
                    <MaterialCommunityIcons 
                        name="flower-tulip" 
                        style = {
                            {
                                ...styles.editModalIcons,
                                fontSize: 150,
                                top: "40%",
                                left: "15%",
                                color: "#fcb0b3",
                            }
                        } 
                    />
                    <MaterialCommunityIcons 
                        name="flower-tulip" 
                        style = {
                            {
                                ...styles.editModalIcons,
                                left: "20%",
                                color: "#73d2de",
                            }
                        } 
                    />
                </View>
                {logOutModalVisible ?
                <LogOutModal {...logOutModalPropsObj}/>:
                null}
            </Modal>
        </View>
        
    )
}

export default EditModal

const styles = StyleSheet.create({

    outerModalContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    innerModalContainer: {
        backgroundColor: "#fff",
        elevation: 5,
    },
    imageInputGroup: {
        zIndex: 8,
        top: "20%",
        left: "10%",
    },
    imageInput: {
        backgroundColor: "#fafcee",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#ccc",
        width: "100%",
        fontSize: 18,
        height: 40,
        paddingLeft: 20,
        color: "#333",
        elevation: 5,
    },
    closeEditContainer: {
        position:"absolute",
        top: "10%",
        left: "20%",
        zIndex: 7,
    },
    closeEditIcon: {
        zIndex: 8,
        fontSize: 80,
        color: "black"
    },
    submitContainer: {
        height: 40,
        marginBottom:10,
        top: "22%",
        left: "7%",
    },
    submitButton: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#4e372c',
        width:"100%",
        elevation: 5,
    },
    buttonText: {
        color: '#ffbf00',
        fontSize: 14,
        fontWeight: 'bold'
    },
    editModalIcons: {
        position:"absolute",
        fontSize: 100, 
        zIndex: 9,
        top: "42%",
    },
})
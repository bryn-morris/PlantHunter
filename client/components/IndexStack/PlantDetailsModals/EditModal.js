import { Modal, TextInput, Button, TouchableOpacity, Text } from "react-native"
import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { PlantContext } from "../../../context/PlantContext"
import LogOutModal from "../../Login and Auth/LogOutModal"
import { useFormik } from 'formik'
import * as yup from 'yup'

function EditModal ({navigation, editModalVisible, setEditModalVisible, specificPlant }) {

    const { userToken, logOutModalVisible, setLogOutModalVisible } = useContext(AuthContext)
    const { userPlants, setUserPlants } = useContext(PlantContext)
    const [ isError, setIsError ] = useState(null)


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
                if (error.status === 401){
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
        <Modal
            visible={editModalVisible}
            animationType="slide"
            onRequestClose={()=> setEditModalVisible(false)}
        >
            <TextInput 
                placeholder='New Image URL'
                onChangeText={formik.handleChange('image')}
                value = {formik.values.image}
            />
            {formik.touched.uri && formik.errors.uri && (
                <Text style={{ color: 'red' }}>{formik.errors.image}</Text>
            )}
            {isError ? 
                <Text style={{ color: 'red' }}>Plant not Found!</Text> : null
            }
            <Button 
                title = 'Submit Your Changes'
                onPress={formik.handleSubmit}
            />
            <TouchableOpacity key={specificPlant.id} onPress={()=>setEditModalVisible(false)}>
                <Text>Close</Text>
            </TouchableOpacity>
            {logOutModalVisible ?
            <LogOutModal {...logOutModalPropsObj}/>:
            null}
        </Modal>
    )
}

export default EditModal
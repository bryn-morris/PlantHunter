import { Modal, TextInput, Button, TouchableOpacity, Text } from "react-native"
import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { PlantContext } from "../../../context/PlantContext"

function EditModal ({editModalVisible, setEditModalVisible, specificPlant }) {

    const { userToken } = useContext(AuthContext)
    const { userPlants, setUserPlants } = useContext(PlantContext)

    ////////////////////////////////////////////////
    ///////   Patch from Plant Details
    ////////////////////////////////////////////////

    const handleFormSubmit = (formObj) => {
        fetch (`https://customngrok.ngrok.app/plantsbyuser/${formObj.id}`,{
            method: "PATCH",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            },
            body: JSON.stringify(formObj)
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
            }
        ) 
    }

    const defaultFormObject = {
        id: specificPlant.id,
        image: '',
    }
    const [formObject, setFormObject] = useState(defaultFormObject)

    const handleEditSubmit = () => {
        handleFormSubmit(formObject)
        setEditModalVisible(false)
    }

    const handleInputChange = (id, text) => {
        setFormObject(()=>{return(
            {...formObject, [id]:text}
        )})
    }

    return(
        <Modal
            visible={editModalVisible}
            animationType="slide"
            onRequestClose={()=> setEditModalVisible(false)}
        >
            <TextInput 
                placeholder='New Image URL'
                onChangeText={(text)=>handleInputChange('image', text)}
                value = {formObject.image}
            />
            <Button 
                title = 'Submit Edit'
                onPress={handleEditSubmit}
            />
            <TouchableOpacity key={specificPlant.id} onPress={()=>setEditModalVisible(false)}>
                <Text>Close</Text>
            </TouchableOpacity>
        </Modal>
    )

}

export default EditModal


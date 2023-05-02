import { Modal, TextInput, Button, TouchableOpacity, Text } from "react-native"
import { useState } from "react"

function EditModal ({editModalVisible, setEditModalVisible, handleFormSubmit, specificPlant }) {

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


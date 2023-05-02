import { View, Text, Button, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react';
import PlantUsers from './PlantDetailsModals/PlantUsers';

import EditModal from './PlantDetailsModals/EditModal';

function PlantDetails({route}) {
    
    const specificPlant = route.params.plant

    // useEffect(()=>{
    //     setSpecificPlant(route.params.plant)
    // }, [route.params.plant])
    
    const handleFormSubmit = route.params.handleFormSubmit

    // want to be able to click on the text/button/icon with the relevant info 
    // to edit the details on the card, pass that prop back to index
    // so that updates are rendered there if the image is updated
    // and send a fetch to update the backend

    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false)

    // eventually I want the edit functionality for name tied to a search bar
    // that the user must use to search through documented plants so that
    // the species and genus etc may be determined.

    // Want to implement Flask Uploads so user can upload a photo from their
    // mobile device instead of having to use a url


    editModalPropsObj = {
        editModalVisible: editModalVisible,
        setEditModalVisible: setEditModalVisible,
        handleFormSubmit: handleFormSubmit,
        specificPlant: specificPlant
    }

    userModalPropsObj = {
        modalVisible: modalVisible,
        setModalVisible: setModalVisible,
        specificPlant: specificPlant,
    }

    return (
        <View>
            
            {/* Edit Modal */}
            <TouchableOpacity onPress={()=>setEditModalVisible(true)}>
                <Text>Edit</Text>
            </TouchableOpacity>
            <EditModal {...editModalPropsObj}/>
            {/* Plant Detail Data */}
            <Image 
                source = {{uri: specificPlant.image}}
                style = {styles.image}
            />
            <Text>{specificPlant.name}</Text>
            <Text>{specificPlant.growth_duration}</Text>
            <Text>{specificPlant.genus}</Text>
            <Text>{specificPlant.growth_habit}</Text>
            <Text>{specificPlant.description}</Text>
            <Text>{specificPlant.species}</Text>
            {/* User Comments Modal Below */}
            <Button 
                title = 'User Reviews'
                onPress={()=>{setModalVisible(true)}}
            />
            <PlantUsers {...userModalPropsObj}/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin: 10
      },
})

export default PlantDetails  
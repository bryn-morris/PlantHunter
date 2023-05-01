import { View, Text, Button, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useState } from 'react';
import ModalData from './ModalData';

function PlantDetails({route}) {
    
    const specificPlant = route.params.plant
    console.log(specificPlant)

    // want to be able to click on the text/button/icon with the relevant info 
    // to edit the details on the card, pass that prop back to index
    // so that updates are rendered there if the image is updated
    // and send a fetch to update the backend

    const [modalVisible, setModalVisible] = useState(false);

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    return (
        <View>
            <Text>{specificPlant.name}</Text>
            <Image 
                source = {{uri: specificPlant.image}}
                style = {styles.image}
            />
            <Text>{specificPlant.growth_duration}</Text>
            <Text>{specificPlant.genus}</Text>
            <Text>{specificPlant.growth_habit}</Text>
            <Text>{specificPlant.description}</Text>
            <Text>{specificPlant.species}</Text>
            <Button 
                title = 'User Reviews'
                onPress={()=>{setModalVisible(true)}}
            />
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={handleCloseModal}
            >
                {specificPlant.observations.map((eachObs)=><ModalData key = {eachObs.id} eachObs={eachObs} />)}
                <TouchableOpacity onPress={handleCloseModal}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </Modal>
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
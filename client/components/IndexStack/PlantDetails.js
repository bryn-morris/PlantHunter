import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useEffect, useState, useContext } from 'react';
import PlantUsers from './PlantDetailsModals/PlantUsers';

import EditModal from './PlantDetailsModals/EditModal';
import { PlantContext } from '../../context/PlantContext';


function PlantDetails({navigation, route}) {
    
    const [specificPlant, setSpecificPlant] = useState(route.params.plant)

    const {userPlants} = useContext(PlantContext)

    useEffect(()=>{
        setSpecificPlant(()=>{
            return userPlants.find(eachPl => eachPl.id == specificPlant.id)
        })
    },
    [userPlants])
    
    const handleFormSubmit = route.params.handleFormSubmit

    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false)

    // eventually I want the edit functionality for name tied to a search bar
    // that the user must use to search through documented plants so that
    // the species and genus etc may be determined.

    // Want to implement Flask Uploads so user can upload a photo from their
    // mobile device instead of having to use a url

    /////////////////////////////////
    ///////   Props Objects
    /////////////////////////////////

    editModalPropsObj = {
        editModalVisible: editModalVisible,
        setEditModalVisible: setEditModalVisible,
        handleFormSubmit: handleFormSubmit,
        specificPlant: specificPlant,
        navigation: navigation,
    }

    userModalPropsObj = {
        modalVisible: modalVisible,
        setModalVisible: setModalVisible,
        specificPlant: specificPlant,
    }

    ////////////////////////////////////////////
    ///////   Rendered to Page
    ////////////////////////////////////////////

    return (
        <View>
            {
                specificPlant ? 
                (<> 
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
                 </>
                ) :
                <Text> Loading... </Text>
            }
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
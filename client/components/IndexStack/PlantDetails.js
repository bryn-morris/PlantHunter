import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { useEffect, useState, useContext } from 'react';
import PlantUsers from './PlantDetailsModals/PlantUsers';
import EditModal from './PlantDetailsModals/EditModal';
import { PlantContext } from '../../context/PlantContext';
import { Ionicons } from '@expo/vector-icons';


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
    const {height, width} = Dimensions.get('screen')
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false)

    // eventually I want the edit functionality for name tied to a search bar
    // that the user must use to search through documented plants so that
    // the species and genus etc may be determined.

    // Want to implement Flask Uploads so user can upload a photo from their
    // mobile device instead of having to use a url
    
    //refactor header icon renders similar to interpolate index and render
        // names in an array.from({length: 5}, ()=>{"ios-flower"}) and map
        // through

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
        <View style = {styles.container}>
            <View style = {
                {
                    ...styles.headerContainer, 
                    width: width,
                    height: height*.2
                    }
            }>
                <Ionicons 
                    name="ios-flower" 
                    style = {styles.headerIcon1}
                />
                <Ionicons 
                    name="ios-flower" 
                    style = {styles.headerIcon2}
                />
                <Ionicons 
                    name="ios-flower" 
                    style = {styles.headerIcon3}
                />
                <Ionicons 
                    name="ios-flower" 
                    style = {styles.headerIcon4}
                />
                <Ionicons 
                    name="ios-flower" 
                    style = {styles.headerIcon5}
                />
                <View style = {
                    {
                        ...styles.headerTextContainer,
                        width: width*4,
                        height: width*4,
                        borderRadius: width*2,
                    }
                }>
                    <Text style = {styles.headerText}>
                        Plant Details
                    </Text>
                </View>
            </View>
            {
                specificPlant ? 
                (<> 
                    <View style = {styles.editContainer}>
                        <TouchableOpacity 
                            onPress={()=>setEditModalVisible(true)}
                            style = {styles.editButton}
                        >
                            <Text
                                style = {styles.editButtonText}
                            >Edit</Text>
                        </TouchableOpacity>
                        <EditModal {...editModalPropsObj}/>
                    </View>
                    <View style = {styles.plantDataContainer}>
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
                    </View>
                    {/* Plant Detail Data */}
                        
                    {/* User Comments Modal Below */}
                    <View style = {styles.usersModalContainer}>
                        <TouchableOpacity 
                            onPress={()=>{setModalVisible(true)}}
                            style = {styles.usersModalButton}
                        >
                            <Text
                                style = {styles.usersModalButtonText}
                            >
                                User Reviews
                            </Text>
                        </TouchableOpacity>
                        <PlantUsers {...userModalPropsObj}/>
                    </View>   
                 </>
                ) :
                <Text> Loading... </Text>
            }
        </View>
    )
}

////////////////////////////////////////////////
///////  Styling
////////////////////////////////////////////////

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fafcee",
        alignItems: 'center',
    },
    headerContainer:{
        backgroundColor: "#4a7c59",
        alignItems: 'center',
    },
    headerIcon1: {
        fontSize: 120,
        color: "#73d2de",
        zIndex: 1,
        top: "-5%",
    },
    headerIcon2:{
        position: "absolute",
        fontSize: 120,
        color: "#8f2d56",
        zIndex: 2,
        right: "18%",
        top: "-3%",
    },
    headerIcon3: {
        position: "absolute",
        fontSize: 120,
        color: "#ffbc42",
        zIndex: 2,
        left: "18%",
        top: "-3%",
    },
    headerIcon4:{
        position: "absolute",
        fontSize: 120,
        color: "#5c415d",
        zIndex: 3,
        left: "-2%",
        top: "3%",
    },
    headerIcon5: {
        position: "absolute",
        fontSize: 120,
        color: "#fcb0b3",
        zIndex: 3,
        right: "-2%",
        top: "3%",
    },
    headerTextContainer:{
        top: "30%",
        position:"absolute",
        alignItems: 'center',
        backgroundColor:"#d5ceae",
        paddingTop: 10,
        elevation: 10,
        zIndex: 4,
    },
    headerText:{
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'braah-one',
        color: "#4e372c",
    },
    editContainer:{

    },
    editButton: {

    },
    editButtonText:{

    },
    plantDataContainer: {

    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin: 10
    },
    usersModalContainer: {
    
    },
    usersModalButton: {

    },
    usersModalButtonText: {

    },
})

export default PlantDetails  
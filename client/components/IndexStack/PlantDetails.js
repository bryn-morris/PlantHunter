import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { useEffect, useState, useContext } from 'react';
import PlantUsers from './PlantDetailsModals/PlantUsers';
import { PlantContext } from '../../context/PlantContext';
import { Ionicons } from '@expo/vector-icons';
import EditButton from './EditButton';


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

    // refactor stylesheet icons so that differences are in line and all
        // inherit from the same style

    // add edit buttons to each section of data and change the
        // content in the edit modal based on which section of data is clicked

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
                    <View style = {
                        {
                            ...styles.plantDataContainer,
                            width:width,
                            height:height,
                        }
                    }>
                        <View 
                            style = {
                                {
                                    ...styles.imageContainer,
                                    width: width*.45,
                                }
                            }
                        >
                            <View style = {styles.imageEditIcon}>
                                <EditButton setEditModalVisible = {setEditModalVisible}/>
                            </View>
                            
                            <Image 
                                source = {{uri: specificPlant.image}}
                                style = {styles.image}
                            />
                        </View>
                        
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
        position: "absolute",
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
        fontSize: 55,
        fontFamily: 'braah-one',
        color: "#4e372c",
    },
    plantDataContainer: {
        backgroundColor: "#fafcee",
        // alignItems: "center",
        top:"-5%",
        borderTopWidth: 2,
        borderTopColor: "#4e372c"
    },
    imageContainer:{
        alignContent: "center",
        padding: 10,
        top: "8%",
    },
    image: {
        width: 160,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 80,
        borderWidth: 2,
        borderColor: '#4e372c',
    },
    imageEditIcon: {
        position:"absolute",
        zIndex:1,
        right: "0%",
    },
    usersModalContainer: {
    
    },
    usersModalButton: {

    },
    usersModalButtonText: {

    },
})

export default PlantDetails  
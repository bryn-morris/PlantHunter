import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import LogOutButton from './LogOutButton'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import LogOutModal from '../Login and Auth/LogOutModal'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



//Settings Icon to have user be able to update and change their settings
// possibly integrate react native elements for ui
// Logout functionality should be included, Delete Account

// Add Badges
// Add Carousel to Badges

// combine two fetch reqeusts into one, can access observations through user

function MyProfile({navigation}) {

    const { userToken, logOutModalVisible, setLogOutModalVisible } = useContext(AuthContext)

    const [ plantIndexImages, setPlantIndexImages ] = useState(null);
    const [ username, setUsername ] = useState(null) 
    // const [ permission, setPermission ] = Camera.useCameraPermissions();
    // const [ photo, setPhoto ] = useState(null);

    const samplebackingp5 = require("../../images/samplebackingp5.png");

    const {height, width} = Dimensions.get('screen')


    ////////////////////////////////////////////
    ///////   Badges Fetch
    ////////////////////////////////////////////

    // Will need to fetch to either badges or user table in db.


    ////////////////////////////////////////////
    ///////   Random Image from DB
    ////////////////////////////////////////////

    function determineRandomImageIndex () {
        return Math.floor(Math.random()* plantIndexImages.length)
    }

    useEffect( () => {
        fetch('https://customngrok.ngrok.app/currentuser',{
            method: "GET",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            }
        })
        .then(r=>{
            if (!r.ok) {
                setLogOutModalVisible(true)
            };
            return r.json()})
        .then(username => {
            setUsername(username.username)
        })
    }
    ,[]
    )

    useEffect( () => {
        fetch('https://customngrok.ngrok.app/observationsbyuser',{
            method: "GET",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            }
        })
        .then(r=>{
            if (!r.ok) {
                setLogOutModalVisible(true)
            };
            return r.json()})
        .then(plants => {
            setPlantIndexImages(plants)
        })
    }
    ,[]
    )

    ////////////////////////////////////////////
    ///////   New Observation
    ////////////////////////////////////////////

    const handleNewObservation = () => {
        navigation.replace('NewObservation')
        console.log("Is this hooked up?")
    }
    
    ////////////////////////////////////////////
    ///////   Rendered to Page
    ////////////////////////////////////////////

    return(
        <View style = {styles.pageContainer}>
            <View style = {styles.headerContainer}>
                <LogOutButton navigation = {navigation}/>
                <View style = {styles.usernameContainer}>
                    <FontAwesome 
                        name="user-circle-o" 
                        style = {styles.usernameIcon}
                    />
                    {username && (
                        <Text
                            style = {styles.usernameText}
                        >{username}
                        </Text>
                    )}
                </View>
                
            </View>
            <View style = {styles.imageContainer}>
                {
                    plantIndexImages && plantIndexImages.length > 0 ?
                        <Image 
                            source = {{uri: plantIndexImages[determineRandomImageIndex()].image}}
                            style = {styles.image}
                        />:
                        null
                }
                <Image source = {samplebackingp5} style = {styles.imageBacking}/>
                <Ionicons  
                    name="search"
                    size={350} 
                    color="#ffbf00" 
                    style = {styles.searchImageContainer}
                />
                <FontAwesome 
                    name="circle"
                    size={200} 
                    color="#eae6d7"
                    style = {styles.circleBacking}
                />
            </View>
            {/* <BadgeFlowers/> */}
            <View style = {styles.buttonContainer} >
                <TouchableOpacity
                    onPress = {handleNewObservation}
                    style = {styles.newObservationButton}
                >
                    <FontAwesome5 
                        name="camera" 
                        size={48} 
                        style = {styles.newObservationButtonImage} 
                    />
                </TouchableOpacity>
            </View>
            <View style = {styles.badgeContainer}>
                <View style = {
                        {...styles.badgeTitleContainer,
                            width: width*2, 
                            height: width*2, 
                            borderRadius: width
                        }
                    }
                >
                    <Ionicons 
                        name="ribbon" 
                        style = {styles.badgeContainerImage}
                    />
                </View>
            </View>
            <View style = {
                {
                    ...styles.designSpacer, 
                    width: width,
                    height: height/75,
                }
                }
            />
            {
                logOutModalVisible ?
                <LogOutModal navigation={navigation} /> :
                null
            }
        </View>   
    )
}

export default MyProfile

////////////////////////////////////////////////
///////  Styling
////////////////////////////////////////////////

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#fafcee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        backgroundColor:"#fafcee",
        flex:1/8,
        top: "-10%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    usernameContainer: {
        position: 'absolute',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fafcee',
        height:"70%",
        width:"30%",
        left:30,
        bottom:-20,
    },
    usernameIcon: {
        fontSize: 30,
        color: "#4e372c",
    },
    usernameText: {
        color: '#4e372c',
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
    },
    buttonContainer:{
        position: "absolute",
        flex:1/7,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: "0%",
        zIndex: 1,
    },
    newObservationButton:{
        position: 'absolute',
        alignItems: 'center',
        padding: 10,
        borderRadius: 180,
        backgroundColor: '#4a7c59',
        width:160,
        height:160,
        elevation: 5,
    },
    newObservationButtonImage: {
        color: '#ffbf00',
        fontSize: 60,
        paddingTop: "0%",
        fontWeight: 'bold',
    },
    imageContainer:{
        flex:1/3,
        alignItems: 'center',
        top: "-5%",
        width: "100%",
        justifyContent: 'center',
        backgroundColor: "#fafcee"
    },
    image: {
        width: 170,
        height: 170,
        resizeMode: 'cover',
        margin: 30,
        borderRadius: 85,
        zIndex:2
    },
    imageBacking: {
        position: "absolute",
    },
    circleBacking: {
        position:  'absolute',
        zIndex: 1,
    },
    searchImageContainer: {
        position: "absolute",
        zIndex: 2,
        right: 55,
        top: -36,
        transform: [{ rotate: '90deg' }],
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 8,
        textShadowColor: '#5A5A5A'
    },
    badgeContainer:{
        flex: 1/3,
        bottom: "0%",
        backgroundColor:"#fff",
        alignItems: 'center',
    },
    badgeTitleContainer: {
        position:"absolute",
        alignItems: 'center',
        backgroundColor:"#d5ceae",
        paddingTop: 10,
        elevation: 10,
    },
    badgeContainerImage:{
        position:"absolute",
        color: '#4e372c',
        paddingTop: "2%",
        fontSize: 50,
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 3,
        textShadowColor: '#5A5A5A',
    },
    designSpacer: {
        position:"absolute",
        backgroundColor: "#4a7c59",
        bottom: "0%",
        zIndex: 1,
    },

  });
import React, {useContext, useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { AuthContext } from "../context/AuthContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// If I am going to be stuck with a button until I can get gesture
// handler to work there should at least be an animation....

// maybe a pop animation and action lines? Possibly haptic feedback

function OpeningPage ({navigation}) {

    ////////////////////////////////////////////////
    ///////  Font & Image Imports
    ////////////////////////////////////////////////

    const [isSplashReady, setIsSplashReady] = useState(false)
    const samplebackingp5 = require("../images/samplebackingp5.png");
    const { userToken } = useContext(AuthContext)

    async function fetchFonts () {
        await Font.loadAsync({
          'braah-one': require('../assets/fonts/BraahOne-Regular.ttf')
        });
        setIsSplashReady(true);
        SplashScreen.hideAsync();
    }

    useEffect(()=>{
        fetchFonts()
    }, [])

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    if (!isSplashReady) {
        return null;
    }
    
    return(
        <View style = {styles.container}>
            <Text 
                style = {{...styles.title, fontFamily: 'braah-one'}}
            >Plant Hunter</Text>
            <MaterialCommunityIcons 
                name="bee-flower" 
                size={100} 
                color="#4a7c59"
                style = {styles.bee} 
            />
            <Ionicons  
                name="search"
                size={250} 
                color="#ffbf00" 
                style = {styles.border}
            />
            <Image
                source={samplebackingp5}
                alt = "Green dots on ivory background"
                style = {styles.bandBacking}
            />
            <FontAwesome 
                name="circle" 
                size={170} 
                color="#eae6d7"
                style = {styles.circleBacking}
            />
            <TouchableOpacity
                style = {styles.buttonContainer}
                onPress = {() => {navigation.navigate(
                        userToken ?
                        'AppContainer' : 
                        'Loggies'
                )}}
            >
                <MaterialCommunityIcons 
                    name="flower-tulip"
                    size= {100}
                    color= "#4a7c59"
                    style = {styles.buttonIcon}
                />
                <Text style = {{...styles.buttonText, fontFamily: 'braah-one'}}>Start!</Text>
            </TouchableOpacity>
        </View>
    ); 

}

export default OpeningPage

////////////////////////////////////////////////
///////  Styling
////////////////////////////////////////////////

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafcee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        position: 'absolute',
        color: '#4e372c',
        top: 200,
        fontSize: 65,
        transform: [{scaleY:1.2}],
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 8,
        textShadowColor: '#5A5A5A'
    },
    bee: {
        position: 'absolute',
        top: 360,
        zIndex: 1,
        elevation: 5,
    },
    border: {
        position: 'absolute',
        top:310,
        left: 55,
        zIndex: 2, 
        transform: [{ rotate: '90deg' }],
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 8,
        textShadowColor: '#5A5A5A'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#d5ceae',
        left: 70,
        right: 70,
        elevation: 5
    },
    buttonIcon: {
        fontSize: 48,
        marginBottom: 10
    },
    buttonText: {
        color: '#4a7c59',
        fontSize: 18,
        fontWeight: 'bold'
    },
    bandBacking: {
        position:  'absolute',
        zIndex:-1,
        top: 350,
    },
    circleBacking: {
        position:  'absolute',
        zIndex: 0,
        top: 340,
    },
  });
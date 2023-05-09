import React, {useContext, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { AuthContext } from "../context/AuthContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

// If I am going to be stuck with a button until I can get gesture
// handler to work there should at least be an animation....

// maybe a pop animation and action lines? Possibly haptic feedback


function OpeningPage ({navigation}) {

    // const fetchFonts = () => {
    //     return Font.loadAsync({
    //       'braah-one': require('../assets/fonts/BraahOne-Regular.ttf')
    //     });
    //   }

    const samplebackingp5 = require("../images/samplebackingp5.png");

    const { userToken } = useContext(AuthContext)

    // const [dataLoaded, setDataLoaded] = useState(false);

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    // if (dataLoaded === false) {
    //   return (
    //     <AppLoading
    //       startAsync={fetchFonts}
    //       onFinish={() => setDataLoaded(true)}
    //       onError={(err) => console.log(err)}
    //     />
    //   );
    // }

    // if (dataLoaded === true) {
        return(
            <View style = {styles.container}>
                <Text 
                    style = {styles.title}
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
                    color="#fafcee"
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
                    <Ionicons 
                        name="search-circle"
                        size= {100}
                        color= "black"
                        style = {styles.buttonIcon}
                    />
                    <Text style = {styles.buttonText}>Transition Between Screens!</Text>
                </TouchableOpacity>
            </View>
        ); 
    // }
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
        top: 220,
        fontSize: 65,
        fontWeight: 'bold',
        // fontFamily: 'braah-one',
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
        transform: [{ rotate: '90deg' }]
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#fff',
        elevation: 5
    },
    buttonIcon: {
        color: '#000',
        fontSize: 48,
        marginBottom: 10
    },
    buttonText: {
        color: '#000',
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
    }
  });
import { useState } from "react"
import { 
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
 } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Login ({handleLoggiesSubmit}) {

    ////////////////////////////////////////////////
    ///////  Form Submission State and Logic
    ////////////////////////////////////////////////

    const emptyLoginObj = {
        username: '',
        password: ''
    }

    const [loginObj, setLoginObj] = useState(emptyLoginObj)
 
    // add icons to end of search bars but smaller and rotated - maybe with view

    //need to fix toggle, if I am keeping

    const handleLoginSubmit = () => {
        handleLoggiesSubmit(loginObj)
        setLoginObj(emptyLoginObj)
    }

    const handleInputChange = (id, text) => {
        setLoginObj(()=>{return(
            {...loginObj, [id]: text}
        )})
    }

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <View style = {styles.pageContainer}>
            <Text style = {styles.title}>Login</Text>
            <View style = {styles.userContainer}>
                <TextInput
                    placeholder='username'
                    onChangeText={(text)=>handleInputChange('username', text)}
                    value = {loginObj.username}
                    style = {styles.userSearchbar}
                />
            </View>
            <View style = {styles.passContainer}>
                <TextInput
                    placeholder='password'
                    secureTextEntry= {true}
                    onChangeText={(text)=>handleInputChange('password', text)}
                    value = {loginObj.password}
                    style = {styles.passSearchbar}
                />
            </View>
            <MaterialCommunityIcons 
                name="flower-pollen" 
                size={250}
                style = {styles.loginIcon}
            />
            <TouchableOpacity
                onPress = {handleLoginSubmit}
                style = {styles.submitButton}
            >
                <Text style = {styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </View>  
    )
}

export default Login

const styles = StyleSheet.create({
    
    pageContainer: {
        flex: 1,
        backgroundColor: '#d5ceae',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        position: 'absolute',
        fontFamily: 'braah-one',
        top: 0,
        color: '#4e372c',
        fontSize: 65,
        transform: [{scaleY:1.2}],
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 8,
        textShadowColor: '#5A5A5A'
    },
    userSearchbar: {
        backgroundColor: "#fafcee",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#ccc",
        width: "100%",
        fontSize: 18,
        height: 40,
        paddingLeft: 20,
        color: "#333",
        elevation: 5,
    },
    passSearchbar: {
        backgroundColor: "#fafcee",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#ccc",
        width: "100%",
        fontSize: 18,
        height: 40,
        paddingLeft: 20,
        color: "#333",
        elevation: 5,
    },
    submitButton: {
        position: 'absolute',
        bottom: 150,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#4e372c',
        left: 70,
        right: 70,
        elevation: 5,
    },
    loginIcon: {
        position: 'absolute',
        top: 120,
        color: '#4e372c',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 8,
        textShadowColor: '#5A5A5A',
        zIndex: -1,
    },
    buttonText: {
        color: '#ffbf00',
        fontSize: 18,
        fontWeight: 'bold'
    },
    userContainer: {
        top:100,
        height: 40,
        width: "80%",
        backgroundColor: '#d5ceae',
        marginBottom:10,
    },
    passContainer: {
        top:100,
        height: 40,
        width: "80%",
        backgroundColor: '#d5ceae',
        marginBottom:10,
    },
    
})
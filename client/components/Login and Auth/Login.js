import { useState } from "react"
import { 
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
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
    // Some Kind of Listener - when keyboard is focused, translate input fields
    // up and remove everything from page other than the input fields and title
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
    // add icons to end of search bars but smaller and rotated

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
                    <TextInput
                        placeholder='username'
                        onChangeText={(text)=>handleInputChange('username', text)}
                        value = {loginObj.username}
                        style = {styles.userSearchbar}
                    >
                    </TextInput>
                    <TextInput
                        placeholder='password'
                        secureTextEntry= {true}
                        onChangeText={(text)=>handleInputChange('password', text)}
                        value = {loginObj.password}
                        style = {styles.passSearchbar}
                    >
                    </TextInput>
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
        top: 120,
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
        top:200,
        height: 40,
        width: "80%",
        paddingLeft: 20,
        fontSize: 18,
        color: "#333",
        marginBottom: 20,
        elevation: 5,
    },
    passSearchbar: {
        backgroundColor: "#fafcee",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#ccc",
        top:200,
        height: 40,
        width: "80%",
        paddingLeft: 20,
        fontSize: 18,
        color: "#333",
        marginBottom: 20,
        elevation: 5,
    },
    submitButton: {
        position: 'absolute',
        bottom: 70,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#4e372c',
        left: 70,
        right: 70,
        elevation: 5,
        zIndex:2,
    },
    loginIcon: {
        position: 'absolute',
        top: 230,
        color: '#4e372c',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 8,
        textShadowColor: '#5A5A5A'
    },
    buttonText: {
        color: '#ffbf00',
        fontSize: 18,
        fontWeight: 'bold'
    },
})
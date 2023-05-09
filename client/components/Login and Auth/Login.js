import { useState, useEffect } from "react"
import { 
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
    Keyboard
 } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Login ({handleLoggiesSubmit}) {

    ////////////////////////////////////////////////
    ///////  Form Submission State and Logic
    ////////////////////////////////////////////////

    const emptyLoginObj = {
        username: '',
        password: ''
    };

    const [loginObj, setLoginObj] = useState(emptyLoginObj);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
 
    // add icons to end of search bars but smaller and rotated - maybe with view

    //need to fix toggle, if I am keeping

    const handleLoginSubmit = () => {
        handleLoggiesSubmit(loginObj)
        setLoginObj(emptyLoginObj)
    };

    const handleInputChange = (id, text) => {
        setLoginObj(()=>{return(
            {...loginObj, [id]: text}
        )})
    };

    ////////////////////////////////////////////////
    ///////  KeyBoard Events Listeners
    ////////////////////////////////////////////////

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener('keyboardDidShow',(e) =>
            {
                setIsKeyboardVisible(true);
            },
        );
        const keyboardHideListener = Keyboard.addListener('keyboardDidHide',({nativeEvent}) =>
            {
                setIsKeyboardVisible(false);
            },
        );
    
        // cleanup
        return () => {
          keyboardShowListener.remove();
          keyboardHideListener.remove();
        };
      }, []);

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <View style = {styles.pageContainer}>
            {isKeyboardVisible ? null :
            <>
                <Text style = {styles.title}>Login</Text>
                <View style = {styles.imageContainer}>
                    <MaterialCommunityIcons 
                        name="flower-pollen" 
                        size={250}
                        style = {styles.loginIcon}
                    />
                </View>
            </>  
            }
            <View style = {styles.inputContainer}>
                <TextInput
                    placeholder='username'
                    onChangeText={(text)=>handleInputChange('username', text)}
                    value = {loginObj.username}
                    style = {styles.inputBar}
                />
            </View>
            <View style = {styles.inputContainer}>
                <TextInput
                    placeholder='password'
                    secureTextEntry= {true}
                    onChangeText={(text)=>handleInputChange('password', text)}
                    value = {loginObj.password}
                    style = {styles.inputBar}
                />
            </View>
            <View style = {styles.submitContainer}>
                <TouchableOpacity
                    onPress = {handleLoginSubmit}
                    style = {styles.submitButton}
                >
                    <Text style = {styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>  
    )
}

export default Login

////////////////////////////////////////////////
///////  Styling
////////////////////////////////////////////////

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
        textShadowColor: '#5A5A5A',
    },
    imageContainer: {
        flex:1/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    loginIcon: {
        position: 'absolute',
        top: 0,
        color: '#4e372c',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 8,
        textShadowColor: '#5A5A5A',
        zIndex: -1,
    },
    inputContainer: {
        height:'auto',
        width: "80%",
        backgroundColor: '#d5ceae',
        marginBottom: 30,
    },
    inputBar: {
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
    submitContainer: {
        height: 40,
        width: "50%",
        backgroundColor: '#d5ceae',
        marginBottom:10,
        top:160,
    },
    submitButton: {
        position: 'absolute',
        bottom: 150,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#4e372c',
        width:"100%",
        elevation: 5,
    },
    buttonText: {
        color: '#ffbf00',
        fontSize: 18,
        fontWeight: 'bold'
    },   
})
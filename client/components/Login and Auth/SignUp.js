import { 
    View,
    TextInput,
    TouchableOpacity, 
    Text, 
    StyleSheet,
    Keyboard 
} from "react-native"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FontAwesome5 } from '@expo/vector-icons';
import { useState, useEffect } from "react";

function SignUp ({handleLoggiesSubmit}) {

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    ////////////////////////////////////////////////
    ///////  Formik and Yup 
    ////////////////////////////////////////////////

    const signUpFormSchema = yup.object().shape({
        username : yup.string()
            .required('You must enter a username!')
            .matches(/^\w+$/, 'Username can only contain letters, numbers, and underscores')
            .min(8),
        password : yup.string()
            .required('You must enter a password!')
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-\=[\]{};':"\\|,.<>\/?])/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
            .min(8),
        email: yup.string()
            .required('You must enter an email!')
            .email("Invalid Email!")
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: ''
        },
        validationSchema: signUpFormSchema,
        onSubmit: (values) => handleLoggiesSubmit(values)
    });

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

    // The ground element moves hwen formik renders the relevant components : <
    // commenting out for now have other things to focus on

    return(
        <View style = {styles.pageContainer}>
            
            {isKeyboardVisible ? null :
            <>
                <Text style = {styles.title}>Sign Up</Text>
                <View style = {styles.imageContainer}>
                    <FontAwesome5 
                        name="kiwi-bird"
                        size={200}
                        style = {styles.signupIcon}
                    />
                    {/* <Text style = {styles.ground}>....................</Text> */}
                </View>
            </>   
            }
            <View style = {styles.inputContainer}>
                <TextInput
                    placeholder='username'
                    onChangeText={formik.handleChange('username')}
                    onBlur={formik.handleBlur('username')}
                    value= {formik.values.username}
                    style = {styles.inputBar}
                >
                </TextInput>
                {formik.touched.username && formik.errors.username && (
                    <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
                )}
            </View>
            <View style = {styles.inputContainer}>
                <TextInput
                    placeholder='password'
                    secureTextEntry= {true}
                    onChangeText={formik.handleChange('password')}
                    onBlue = {formik.handleBlur('password')}
                    value= {formik.values.password}
                    style = {styles.inputBar}
                >
                </TextInput>
                {formik.touched.password && formik.errors.password && (
                    <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
                )}
            </View>
            <View style = {styles.inputContainer}>
                <TextInput
                    placeholder='email'
                    onChangeText={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    value= {formik.values.email}
                    style = {styles.inputBar}
                >
                </TextInput>
                {formik.touched.email && formik.errors.email && (
                    <Text style={{ color: 'red' }}>{formik.errors.email}</Text>
                )}
            </View>
            <View style = {styles.submitContainer}>
                <TouchableOpacity
                    onPress = {formik.handleSubmit}
                    style = {styles.submitButton}
                >
                    <Text style = {styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp

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
    imageContainer: {
        flex:1/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    signupIcon: {
        position: 'absolute',
        top: 0,
        color: '#4e372c',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 8,
        textShadowColor: '#5A5A5A',
        zIndex: -1,
    },
    ground: {
        position: 'absolute',
        fontSize: 50,
        bottom: "-3%",
        color: '#4e372c',
        fontFamily: 'braah-one',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 8,
        textShadowColor: '#5A5A5A',
    },  
    inputContainer: {
        height: 'auto',
        width: "80%",
        backgroundColor: '#d5ceae',
        marginBottom:30,
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
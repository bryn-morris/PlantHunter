import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FontAwesome5 } from '@expo/vector-icons';

function SignUp ({handleLoggiesSubmit}) {

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
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <View style = {styles.pageContainer}>
            <Text style = {styles.title}>Sign Up</Text>
            <Text style = {styles.ground}>....................</Text>
            <TextInput
                placeholder='username'
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
                value= {formik.values.username}
                style = {styles.userSearchbar}
            >
            </TextInput>
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
            )}
            <TextInput
                placeholder='password'
                secureTextEntry= {true}
                onChangeText={formik.handleChange('password')}
                onBlue = {formik.handleBlur('password')}
                value= {formik.values.password}
                style = {styles.passSearchbar}
            >
            </TextInput>
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
            )}
            <TextInput
                placeholder='email'
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value= {formik.values.email}
                style = {styles.emailSearchbar}
            >
            </TextInput>
            {formik.touched.email && formik.errors.email && (
                <Text style={{ color: 'red' }}>{formik.errors.email}</Text>
            )}
            <FontAwesome5 
                name="kiwi-bird"
                size={200}
                style = {styles.signupIcon}
            />
            <TouchableOpacity
                onPress = {formik.handleSubmit}
                style = {styles.submitButton}
            >
                <Text style = {styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
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
        top:210,
        height: 40,
        width: "80%",
        paddingLeft: 20,
        fontSize: 18,
        color: "#333",
        marginBottom: 20,
        elevation: 5,
    },
    emailSearchbar: {
        backgroundColor: "#fafcee",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#ccc",
        top:220,
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
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#4e372c',
        left: 70,
        right: 70,
        elevation: 5,
    },
    signupIcon: {
        position: 'absolute',
        top: 230,
        color: '#4e372c',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 8,
        textShadowColor: '#5A5A5A',
    },
    buttonText: {
        color: '#ffbf00',
        fontSize: 18,
        fontWeight: 'bold'
    },
    ground: {
        position: 'absolute',
        fontSize: 50,
        bottom: 308,
        color: '#4e372c',
        fontFamily: 'braah-one',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 8,
        textShadowColor: '#5A5A5A',
    },
})
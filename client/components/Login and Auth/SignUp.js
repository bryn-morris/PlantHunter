import { useState} from "react"
import { View, TextInput, Button, Text } from "react-native"
import { useFormik } from 'formik'
import * as yup from 'yup'

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
        <View>
            <TextInput
                placeholder='username'
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
                value= {formik.values.username}
            >
            </TextInput>
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
            )}
            <TextInput
                placeholder='password'
                onChangeText={formik.handleChange('password')}
                onBlue = {formik.handleBlur('password')}
                value= {formik.values.password}
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
            >
            </TextInput>
            {formik.touched.email && formik.errors.email && (
                <Text style={{ color: 'red' }}>{formik.errors.email}</Text>
            )}
            <Button
                title = 'Sign In'
                onPress = {formik.handleSubmit}
            />
        </View>
    )
}

export default SignUp
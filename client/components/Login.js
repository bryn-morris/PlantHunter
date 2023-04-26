import { useState } from "react"
import { View, TextInput, Button } from "react-native"

function Login ({handleSubmitFormObj}) {

    const emptyLoginObj = {
        username: '',
        password: ''
    }

    const [loginObj, setLoginObj] = useState(emptyLoginObj)

    const handleLoginSubmit = (e) => {
        handleSubmitFormObj(loginObj)
        setLoginObj(emptyLoginObj)
    }

    const handleInputChange = (id, text) => {
        console.log(text)
        setLoginObj(()=>{return(
            {...loginObj, [id]: text}
        )})
    }


    return(
        <View>
            <TextInput
                placeholder='username'
                onChangeText={(text)=>handleInputChange('username', text)}
                value = {loginObj.username}
            >
            </TextInput>
            <TextInput
                placeholder='password'
                onChangeText={(text)=>handleInputChange('password', text)}
                value = {loginObj.password}
            >
            </TextInput>
            <Button
                title = 'Log In'
                onPress = {handleLoginSubmit}
            />
        </View>
    )

}

export default Login
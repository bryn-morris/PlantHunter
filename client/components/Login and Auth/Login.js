import { useState } from "react"
import { View, TextInput, Button, Text } from "react-native"


function Login ({handleLoggiesSubmit}) {

    const emptyLoginObj = {
        username: '',
        password: ''
    }

    const [loginObj, setLoginObj] = useState(emptyLoginObj)

    const handleLoginSubmit = () => {
        console.log(loginObj)
        handleLoggiesSubmit(loginObj)
        setLoginObj(emptyLoginObj)
    }

    const handleInputChange = (id, text) => {
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
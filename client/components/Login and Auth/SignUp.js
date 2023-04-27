import { useState} from "react"
import { View, TextInput, Button } from "react-native"


function SignUp ({handleLoggiesSubmit}) {



    const emptySignupObj = {
        username: '',
        password: '',
        email: ''
    }

    const [signupObj, setSignupObj] = useState(emptySignupObj)

    const handleSignupSubmit = () => {
        handleLoggiesSubmit(signupObj)
        setSignupObj(emptySignupObj)

    }

    const handleInputChange = (id, text) => {
        setSignupObj(()=>{return(
            {...signupObj, [id]: text}
        )})
    }

    return(
        <View>
            <TextInput
                placeholder='username'
                onChangeText={(text) => handleInputChange('username',text)}
                value= {signupObj.username}
            >
            </TextInput>
            <TextInput
                placeholder='password'
                onChangeText={(text) => handleInputChange('password', text)}
                value= {signupObj.password}
            >
            </TextInput>
            <TextInput
                placeholder='email'
                onChangeText={(text)=>handleInputChange('email', text)}
                value= {signupObj.email}
            >
            </TextInput>
            <Button
                title = 'Sign In'
                onPress = {handleSignupSubmit}
            />
        </View>
    )

}

export default SignUp
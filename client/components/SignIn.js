import { useState } from "react"
import { View, TextInput, Button } from "react-native"

function Signin ({handleSubmitFormObj}) {

    const emptyLoginObj = {
        username: '',
        password: '',
        email: ''
    }

    const [signupObj, setSignupObj] = useState(emptyLoginObj)

    const handleSignupSubmit = (e) => {
        handleSubmitFormObj(signupObj)
        setSignupObj(emptyLoginObj)
    }

    const handleInputChange = (e) => {
        setSignupObj(()=>{return(
            {...signupObj, [e.target.id]: [e.target.value]}
        )})
    }


    return(
        <View>
            <TextInput
                placeholder='username'
                onChangeText={handleInputChange}
                id='username'
                value= {signupObj.id}
            >
            </TextInput>
            <TextInput
                placeholder='password'
                onChangeText={handleInputChange}
                id='password'
                value= {signupObj.id}
            >
            </TextInput>
            <TextInput
                placeholder='email'
                onChange={handleInputChange}
                id='email'
                value= {signupObj.id}
            >
            </TextInput>
            <Button
                title = 'Sign In'
                onPress = {handleSignupSubmit}
            />
        </View>
    )

}

export default Signin
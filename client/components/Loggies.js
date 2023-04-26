import React, {useState} from 'react'
import { View, Switch} from 'react-native';

import Login from './Login';
import Signin from './SignIn';


function Loggies() {

    const [isLogin, toggleIsLogin] = useState(true)

    const toggleSwitch = (e) => {
        toggleIsLogin(!isLogin)
    }

    const handleSubmitFormObj = (formObj) => {

        console.log(formObj)

        if (isLogin === true) {
            
            //Login Pessimistically with fetch to login Route

        } else {
            

        }
    }

    return(
        <View>
            {
                isLogin ?
                <Login handleSubmitFormObj = {handleSubmitFormObj} /> :
                <Signin handleSubmitFormObj = {handleSubmitFormObj} />    
            }
            <Switch onValueChange={toggleSwitch}/>
        </View>    
    )
}

export default Loggies    
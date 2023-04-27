import React, {useState, useContext, useEffect} from 'react'
import { View, Switch, Text} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

import Login from './Login';
import SignUp from './SignUp';
import Home from './Home'


function Loggies() {


    const [isLogin, toggleIsLogin] = useState('login')

    const { userToken, setUserToken } = useContext(AuthContext)

    const toggleSwitch = (e) => {
        toggleIsLogin(isLogin === 'login' ? 'signup' : 'login')
    }

    useEffect(()=>{
        setUserToken(SecureStore.getItemAsync('token'))
    }, [])

    async function handleLoggiesSubmit(formObj) {
        
        try{
            const r = await fetch(`https://5bd9-174-74-7-135.ngrok-free.app/${isLogin}`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(formObj)
        })
        if(r.ok){
            const token = r.headers.get('authorization').split(' ')[1]
            await SecureStore.setItemAsync('token', token)
            await setUserToken(SecureStore.getItemAsync('token'))
        } else{
            // This returns validation error for signup
            r.json().then(err => console.log(err))
        }
        } catch (error) {
            console.log(error)
        }            
    }

    // Will likely need to refactor to use navigation. Want to go to a completely
    // Different component stack with home at the top once a user has logged
    // in. Will likely also need to change how userToken Works as right now
    // use context is largely unnecessary

    return(
        <View>
            { (userToken == null)  ?
                (
                    isLogin == 'login' ?
                    <View>
                        <Login handleLoggiesSubmit = {handleLoggiesSubmit}/>
                        <Switch onValueChange={toggleSwitch}/>
                    </View>
                     :
                     <View>
                        <SignUp handleLoggiesSubmit = {handleLoggiesSubmit}/>
                        <Switch onValueChange={toggleSwitch}/>
                    </View> 
                ) :
                //rest of app, eventually home page
                <Text>You're Already Logged in!</Text>
                // <Home />
            }
        </View>    
    )
}

export default Loggies    
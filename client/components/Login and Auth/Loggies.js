import React, {useState, useContext, useEffect} from 'react'
import { View, Switch, Modal, TouchableOpacity, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { StackActions } from "@react-navigation/routers"


import { AuthContext } from '../../context/AuthContext';
import Login from './Login';
import SignUp from './SignUp';



function Loggies({navigation}) {

    const [isLogin, toggleIsLogin] = useState('login')

    const { setUserToken } = useContext(AuthContext)

    const toggleSwitch = (e) => {
        toggleIsLogin(isLogin === 'login' ? 'signup' : 'login')
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [recentError, setRecentError] = useState(null)

    const handleCloseModal = () => {
        setModalVisible(false);
    };
    

    async function handleLoggiesSubmit(formObj) {
        
        try{
            const r = await fetch(`https://e8b5-174-74-7-135.ngrok-free.app/${isLogin}`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(formObj)
        })
        if(r.ok){
            const token = r.headers.get('authorization').split(' ')[1]
            await SecureStore.setItemAsync('token', token)
            setUserToken(await SecureStore.getItemAsync('token'))
            navigation.dispatch(
                StackActions.replace('Home')
            )
        } else{
            // render modal
            console.log(r)
            r.json().then(err => {
                setRecentError(err[Object.keys(err)[0]])
                setModalVisible(true)
            })
        }
        } catch (error) {
            console.log(error)
        }            
    }

    return(
        <View>
            {
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
            }
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={handleCloseModal}
            >
                <View>
                <TouchableOpacity onPress={handleCloseModal}>
                    <Text>Close</Text>
                </TouchableOpacity>
                <Text>{recentError}</Text>
                </View>
            </Modal>
        </View>    
    )
}

export default Loggies    
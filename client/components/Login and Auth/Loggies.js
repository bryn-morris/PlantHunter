import React, {useState, useContext} from 'react'
import { View, Switch, StyleSheet, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { StackActions } from "@react-navigation/routers"


import { AuthContext } from '../../context/AuthContext';
import Login from './Login';
import SignUp from './SignUp';
import VerificationModal from './VerificationModal';

function Loggies({navigation}) {

    const [isLogin, toggleIsLogin] = useState('login')

    const { setUserToken } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false);
    const [recentError, setRecentError] = useState(null)

    ////////////////////////////////////////////////
    ///////   POST for Login Logic
    ////////////////////////////////////////////////

    const toggleSwitch = (e) => {
        toggleIsLogin(isLogin === 'login' ? 'signup' : 'login')
    }

    async function handleLoggiesSubmit(formObj) {
        
        try{
            const r = await fetch(`https://customngrok.ngrok.app/${isLogin}`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(formObj)
        })
        if(r.ok){
            const token = r.headers.get('authorization').split(' ')[1]
            await SecureStore.setItemAsync('token', token)
            setUserToken(await SecureStore.getItemAsync('token'))
            navigation.dispatch(
                StackActions.replace('AppContainer')
            )
        } else{
            r.json().then(err => {
                setRecentError(err[Object.keys(err)[0]])
                setModalVisible(true)
            })
        }
        } catch (error) {
            console.log(error)
        }            
    }

    ////////////////////////////////////////////////
    ///////  Props Objects
    ////////////////////////////////////////////////

    const verificationModalObject = {
        modalVisible: modalVisible,
        recentError: recentError,
        setModalVisible: setModalVisible,
    }

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <View style = {styles.pageContainer}>
            <View style = {styles.switchContainer}>
                <Switch onValueChange={toggleSwitch}/>
            </View>
            <ScrollView 
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps='always'
            >
                {
                    isLogin === 'login' ?
                    <Login handleLoggiesSubmit = {handleLoggiesSubmit}/> :
                    <SignUp handleLoggiesSubmit = {handleLoggiesSubmit}/>
                }   
            </ScrollView>
            <VerificationModal {...verificationModalObject}/>
        </View>                     
    )
}
export default Loggies

////////////////////////////////////////////////
///////  Styling
////////////////////////////////////////////////

const styles = StyleSheet.create({
    
    pageContainer: {
        flex: 1,
        backgroundColor: '#d5ceae',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    switchContainer : {
        alignItems: 'center',
        justifyContent: 'center',
        bottom:0,
        marginTop: 60,
        // marginBottom: 20,
        backgroundColor: '#d5ceae',
    },
    verificationModal: {
        
    },
    container: {
        flex: 1,
    },
    contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    },
})
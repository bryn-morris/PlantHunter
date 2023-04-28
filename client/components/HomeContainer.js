import { useContext } from "react";
import { View, Button, Text } from "react-native"
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from "../context/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserStack from "./UserStack/UserStack.js";
import IndexStack from "./IndexStack/IndexStack";
import Home from "./Home";

function HomeContainer({navigation}) {

    //Logout function - move around after routing has been better established

    const { setUserToken } = useContext(AuthContext)

    const Tab = createBottomTabNavigator()

    async function handleLogout() {
        try{
            await SecureStore.deleteItemAsync('token')
            setUserToken(null)
            navigation.popToTop()
        } catch (error){
            console.log(error)
        }
    }

    // Add Compendium (STRETCH GOAL) to Tab Navigator connected to API
    // Need to remove header from the view in the above component??
    return(
            <Tab.Navigator>
                <Tab.Screen name = 'Home' component={Home}/> 
                <Tab.Screen name = 'UserStack' component={UserStack}/>
                <Tab.Screen name = 'IndexStack' component={IndexStack}/>
            </Tab.Navigator>
    )
}

export default HomeContainer
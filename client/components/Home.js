import { useContext } from "react";
import { View, Button, Text } from "react-native"
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from "../context/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyProfile from "./UserStack/UserProfile";
import Index from "./IndexStack/IndexStack";

function Home() {


    return(
        
            <Text>Home Page</Text>
        
        
    )
    
}

export default Home  
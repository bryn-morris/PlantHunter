import { useContext } from "react";
import { View, Button, Text } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IndexStack from "./IndexStack/IndexStack";
import Compendium from "./Compendium.js";
import MyProfile from "./MyProfile";

function AppContainer({navigation}) {

    const Tab = createBottomTabNavigator()

    
    // Add Compendium (STRETCH GOAL) to Tab Navigator connected to API

    return(
            <Tab.Navigator>
                <Tab.Screen name = 'Profile' component={MyProfile} />
                <Tab.Screen name = 'IndexStack' component={IndexStack} options={{ headerShown: false }}/>
                <Tab.Screen name = 'Compendium' component={Compendium} />
            </Tab.Navigator>  
    )
}

export default AppContainer
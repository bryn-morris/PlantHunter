import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IndexStack from "./IndexStack/IndexStack";
import Compendium from "./Compendium.js";
import ProfileStack from "./ProfileStack/ProfileStack";
import { PlantProvider } from "../context/PlantContext";
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { useState } from "react";

function AppContainer() {

    const Tab = createBottomTabNavigator()

    const [isProfileColor, setIsProfileColor ] = useState(false)

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <PlantProvider>
            <Tab.Navigator 
                tabBarOptions={{
                    tabBarActiveTintColor: '#4a7c59',
                    tabBarInactiveTintColor: '#4e372c',
                    tabBarIconSize: 24,
                }}
            >
                <Tab.Screen 
                    name = 'My Profile' 
                    component={ProfileStack}
                    options={{ 
                        headerShown: false,
                        tabBarActiveBackgroundColor: "#d5ceae",
                        tabBarInactiveBackgroundColor: "#d5ceae",
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons
                                name="md-leaf"
                                size={size}
                                color={focused ? "#4a7c59": "#4e372c"}
                            />
                        ),
                        tabBarLabelStyle: {
                            fontWeight: "bold",
                            fontSize: 14,
                            color: ({ focused }) => (focused ? '#4a7c59' : '#4e372c'),
                        }
                     }}
                     
                />
                <Tab.Screen 
                    name = 'My Index'
                    component={IndexStack}
                    options={{ 
                        headerShown: false,
                        tabBarActiveBackgroundColor: "#d5ceae",
                        tabBarInactiveBackgroundColor: "#d5ceae",
                        tabBarIcon: ({ color, size, focused }) => (
                            <Entypo 
                                name="flower"
                                size={size}
                                color={focused ? "#4a7c59": "#4e372c"}
                            />
                        ),
                        tabBarLabelStyle: {
                            fontWeight: "bold",
                            fontSize: 14,
                            color: ({ focused }) => (focused ? '#4a7c59' : '#4e372c'),
                        }
                     }}  
                />
                <Tab.Screen 
                    name = 'My Compendium' 
                    component={Compendium}
                    options={{ 
                        tabBarActiveBackgroundColor: "#d5ceae",
                        tabBarInactiveBackgroundColor: "#d5ceae",
                        tabBarIcon: ({ color, size, focused }) => (
                            <AntDesign 
                                name="aliwangwang"
                                size={size}
                                color={focused ? "#4a7c59": "#4e372c"}
                            />
                        ),
                        tabBarLabelStyle: {
                            fontWeight: "bold",
                            fontSize: 14,
                            color: ({ focused }) => (focused ? '#4a7c59' : '#4e372c'),
                        }
                     }}   
                />
            </Tab.Navigator>  
        </PlantProvider>
    )
}

export default AppContainer

////////////////////////////////////////////////
///////  Styling
////////////////////////////////////////////////


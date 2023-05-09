import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IndexStack from "./IndexStack/IndexStack";
import Compendium from "./Compendium.js";
import ProfileStack from "./ProfileStack/ProfileStack";
import { PlantProvider } from "../context/PlantContext";
import { Ionicons, Entypo } from '@expo/vector-icons';

function AppContainer() {

    const Tab = createBottomTabNavigator()

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <PlantProvider>
            <Tab.Navigator
                tabBarStyle = {{height: 70}}
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: '#4a7c59',
                    tabBarInactiveTintColor: '#4e372c',
                    tabBarIconSize: 28,
                    tabBarActiveBackgroundColor: '#d5ceae',
                    tabBarInactiveBackgroundColor: '#d5ceae',
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: route.state && route.state.index === 0 ? '#4a7c59' : '#4e372c',
                    },
                    tabBarIcon: ({ size, focused }) => {
                        let iconName;

                        if (route.name === 'My Profile') {
                            return (<Ionicons name="md-leaf" size={size} 
                                color={focused ? "#4a7c59": "#4e372c"}/>)
                        } else if (route.name === 'My Index') {
                            iconName = 'flower';
                        } else if (route.name === 'My Compendium') {
                            iconName = 'open-book';
                        }

                        return <Entypo name={iconName} size={size} color={focused ? '#4a7c59' : '#4e372c'} />;
                    },
                })}
            >
                <Tab.Screen 
                    name = 'My Profile' 
                    component={ProfileStack}
                    options={{
                        headerShown: false,
                     }}  
                />
                <Tab.Screen 
                    name = 'My Index'
                    component={IndexStack}
                    options={{
                        headerShown: false,
                     }}  
                />
                <Tab.Screen 
                    name = 'My Compendium' 
                    component={Compendium}
                    options={{
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


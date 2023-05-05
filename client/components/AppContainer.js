import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IndexStack from "./IndexStack/IndexStack";
import Compendium from "./Compendium.js";
import ProfileStack from "./ProfileStack/ProfileStack";
import { PlantProvider } from "../context/PlantContext";

function AppContainer() {

    const Tab = createBottomTabNavigator()

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <PlantProvider>
            <Tab.Navigator>
                <Tab.Screen 
                    name = 'ProfileStack' 
                    component={ProfileStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen 
                    name = 'IndexStack'
                    component={IndexStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen 
                    name = 'Compendium' 
                    component={Compendium} 
                />
            </Tab.Navigator>  
        </PlantProvider>
    )
}

export default AppContainer
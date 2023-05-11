import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlantDetails from './PlantDetails'
import PlantIndex from './PlantIndex';
import PlantUsers from './PlantDetailsModals/PlantUsers';


function IndexStack() {

    const Stack = createNativeStackNavigator()

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////
    
    return (
        <Stack.Navigator initialRouteName='PlantIndex'>
            <Stack.Screen 
                name = 'PlantIndex' 
                component = {PlantIndex} 
                options={{headerShown: false,}}
            />
            <Stack.Screen 
                name = 'PlantDetails' 
                component = {PlantDetails} 
                options={{headerShown: false,}}
            />
            <Stack.Screen 
                name = 'PlantUsers' 
                component = {PlantUsers}
                options={{headerShown: false,}} 
            />
        </Stack.Navigator>
    )

}

export default IndexStack  
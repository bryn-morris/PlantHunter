import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlantDetails from './PlantDetails'
import Index from './Index';
import PlantUsers from './PlantDetailsModals/PlantUsers';

function IndexStack() {

    const Stack = createNativeStackNavigator()
    
    return (
            <Stack.Navigator initialRouteName='Index'>
                <Stack.Screen name = 'Index' component = {Index} />
                <Stack.Screen name = 'PlantDetails' component = {PlantDetails} />
                <Stack.Screen name = 'PlantUsers' component = {PlantUsers} />
            </Stack.Navigator>
    )

}

export default IndexStack  
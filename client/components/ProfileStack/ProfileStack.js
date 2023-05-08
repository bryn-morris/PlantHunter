import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfile from './MyProfile';
import NewObservation from './NewObservation';

function ProfileStack() {

    const Stack = createNativeStackNavigator()

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////
    
    return (
        <Stack.Navigator initialRouteName='MyProfile'>
            <Stack.Screen name = 'MyProfile' component = {MyProfile} />
            <Stack.Screen name = 'NewObservation' component = {NewObservation} />
        </Stack.Navigator>
    )

}

export default ProfileStack
import {View, Text} from 'react-native'
import LogOutButton from './LogOutButton'

//Settings Icon to have user be able to update and change their settings
// Logout functionality should be included, Delete Account

function MyProfile({navigation}) {
    
    

    return(
        <View>
            <LogOutButton navigation = {navigation}/>
            <Text>Profile Page</Text>
        </View>
        
    
)

}

export default MyProfile  
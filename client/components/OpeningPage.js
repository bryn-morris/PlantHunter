import React, {useContext} from 'react'
import { View, Text, Button} from 'react-native'
import { AuthContext } from "../context/AuthContext";


function OpeningPage ({navigation}) {

    const { userToken } = useContext(AuthContext)

    return(
        <View>
            <Text>TESTING OPENING PAGE</Text>
            <Button 
                title = 'Transition Between Screens!'
                onPress = {() => {navigation.navigate(
                        userToken ?
                        'HomeContainer' : 
                        'Loggies'
                )}}
            />
        </View>
    );
    
}

export default OpeningPage
import React, {useContext} from 'react'
import { View, Text, Button, StyleSheet} from 'react-native'
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
                        'AppContainer' : 
                        'Loggies'
                )}}
            />
        </View>
    );
    
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });

export default OpeningPage
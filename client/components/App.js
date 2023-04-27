import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Loggies from './Loggies';
import OpeningPage from './OpeningPage';
import { AuthProvider } from '../context/AuthContext';


function App() {

  // const [isLoading, setIsLoading] = useState(true)
  
  
  const Stack = createNativeStackNavigator()


  // const authContext = useMemo(()=>({
  //   signIn: () =>{
  //     setUserToken(secureToken);
  //     setIsLoading(false);
  //   },
  //   signOut: ()=>{
  //     setUserToken(null);
  //     setIsLoading(false);
  //   },
  //   signUp: () => {
  //     setUserToken(secureToken);
  //     setIsLoading(false)
  //   }
  // }), [])


  // if (isLoading) {
  //   return(
  //     <View style={{flex:1, justifyContent:'center',alignItens:'center'}}>
  //       <ActivityIndicator size = 'large' />
  //     </View>
  //   )
  // }

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setIsLoading(false)
  //   }, 1000)
  // },[])

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Loggies'
          screenOptions={{
            gestureEnabled : true,
            gestureDirection: 'vertical',          
          }}
        >
          <Stack.Screen name = 'OpeningPage' component={OpeningPage}/>
          <Stack.Screen name = 'Loggies' component = {Loggies} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
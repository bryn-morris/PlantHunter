import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Loggies from './Login and Auth/Loggies';
import OpeningPage from './OpeningPage';
import Home from './Home';
import { AuthProvider } from '../context/AuthContext';
import Main from './Main';


function App() {

  // const [isLoading, setIsLoading] = useState(true)
  

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
        <Main />
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

import { StyleSheet } from 'react-native';
import { AuthProvider } from '../context/AuthContext';
import Main from './Main';


function App() {

// Design some kind of Loading Icon Or Page -> A Plant Growing would be really cool

  return (
    <AuthProvider>
        <Main />
    </AuthProvider>
  );
}

export default App
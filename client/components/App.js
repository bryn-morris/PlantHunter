
import { StyleSheet } from 'react-native';
import { AuthProvider } from '../context/AuthContext';
import Main from './Main';


function App() {

  return (
    <AuthProvider>
        <Main />
    </AuthProvider>
  );
}

export default App
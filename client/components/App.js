
import { StyleSheet } from 'react-native';
import { AuthProvider } from '../context/AuthContext';
import Main from './Main';


function App() {

// Design some kind of Loading Icon Or Page -> A Plant Growing would be really cool
// Add required Elements to the Python PIPFile
// Implement FORMIK for frontend Validation
// 

  return (
    <AuthProvider>
        <Main />
    </AuthProvider>
  );
}

export default App
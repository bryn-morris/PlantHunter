
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from '../context/AuthContext';
import Main from './Main';


function App() {

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
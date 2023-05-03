import { AuthProvider } from '../context/AuthContext';
import Main from './Main';

function App() {


//                                    TODO LIST:
//                               __________________

// Design some kind of Loading Icon Or Page -> A Plant Growing would be really
  // neat, or even just a vine pattern that extends across the top of the page
  // and stay there when it is fully loaded
// Add required Elements to the Python PIPFile
// Implement FORMIK for frontend Validation
// Refactor PlantDetails so that images are pulled from observations and flask
  // uploads instead of from plants
//Hook up API for compendium 


  return (
    <AuthProvider>
        <Main />
    </AuthProvider>
  );
}

export default App
import { AuthProvider } from '../context/AuthContext';
import Main from './Main';

function App() {


//                                    TODO LIST:
//                               __________________

// Design some kind of Loading Icon Or Page -> A Plant Growing would be really
  // neat, or even just a vine pattern that extends across the top of the page
  // and stay there when it is fully loaded
// Add required Elements to the Python PIPFile
// Refactor PlantDetails so that images are pulled from observations and flask
  // uploads instead of from plants
//Hook up API for compendium 
// Hook up Plant.id AI for images
// REORG Delete in PlantIndex so that it deletes instance instead of plant
// REORG Patch in PlantIndex so that it patches instance instead of plant
// Refactor so that get request for plants is in Profile, so that we don't need
    // to re-reqeust in newObservation for plant names and ID's
// in userIndex, want to display to users how many they have caught out of
    // total for their region

// Refactor Styling with UI kitten ?? 
// Jiggle when selected!
// Update with responsive styling and positioning - refactor away
  // from using pixel measurements
// refactor Loading... text with <AppLoading> Component in expo

// yellow circles in flower and in kiwi eye in login and signup
// refactor username and logout so they are present on every page with a parent
  // instead of having to re-render them on every tab
// Organize Imports
// Reorganize Keybaord Event listeners so I don't repeat them across pages
// refactor many of my imports out to libraries


  ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

  return (
    <AuthProvider>
        <Main />
    </AuthProvider>
  );
}

export default App
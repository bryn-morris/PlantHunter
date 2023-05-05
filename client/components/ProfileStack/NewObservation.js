import { Text } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
const [ cameraView, setCameraView ] = useState(CameraType.back);

function NewObservation ({navigation}) {
    // Will likely need to add this to Stack in Stack Container

    // want to have user take picture, represent it on screen with an option
    // to retake the picture, as well as a comment box below, and a submit button
    // submit button will post a new instance of observation to database. Will
    // also need to provide a search bar with fuzzy match to select name of
    // plant. this will be used to tie it to the relevant plant_id and entry
    // in the database.

    // Once compendium is built out and project is refactored, once response is
    // received from server, it will update userindex state and images will be
    // visible in plantindex

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <Text>TESTING! New Observeration Page</Text>
    )
}

export default NewObservation
import { Text, Button, View } from 'react-native';
import { PlantContext } from '../../context/PlantContext';
import { useState, useContext, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/AuthContext';


// const [ cameraView, setCameraView ] = useState(CameraType.back);

function NewObservation ({navigation}) {

    ////////////////////////////////////////////////
    ///////  Basic PseudoCode
    ////////////////////////////////////////////////

    // click button and navigate to this component, enter comment and select plant chosen
    // use user phone location to pinpoint location for submission


    ////////////////////////////////////////////////
    ///////  Stretch PseudoCode
    ////////////////////////////////////////////////

    // WOKR ON POST GRADUATION

    // want to have user take picture, represent it on screen with an option
    // to retake the picture, as well as a comment box below, and a submit button
    // submit button will post a new instance of observation to database. Will
    // also need to provide a search bar with fuzzy match to select name of
    // plant. this will be used to tie it to the relevant plant_id and entry
    // in the database.

    // Add option to upload photo instead of take a photo as well

    // Once compendium is built out and project is refactored, once response is
    // received from server, it will update userindex state and images will be
    // visible in plantindex

    // Work in Plant ID AI to ID plants by photo

    const { userPlants, setUserPlants } = useContext(PlantContext)
    const { userToken } = useContext(AuthContext)
    const [ plantNames, setPlantNames ] = useState(null)

    // MAKE Validations for POST
    // const startingOptions = use .map

    const [ searchListOptions, setSearchListOptions ] = useState(null)

    const emptyCommentFormObject = {
        comment: '',
        plant_name: '',
        location: '',
    }

    const [ commentFormObject, setCommentFormObject ] = useState(emptyCommentFormObject)

    ////////////////////////////////////////////////
    ///////  Need a get request to get all plants'
    ///////     names & ID's for fuzzy match
    ////////////////////////////////////////////////

    useEffect(()=>{
        fetch('https://customngrok.ngrok.app/plants',{
            method: "GET",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            }
        })
            .then(r=>r.json())
            .then(setPlantNames)
    }, [])

    ////////////////////////////////////////////////
    ///////  Render Search Match List
    ////////////////////////////////////////////////

    if (commentFormObject.comment.length > 3) {



    } 

    ////////////////////////////////////////////////
    ///////  Navigation & Submission
    ////////////////////////////////////////////////

    const handleSubmitObservation = () => { 

        // navigation.replace('MyProfile')
        console.log(commentFormObject)

        // Post to Update Backend 

        // Update userPlants state in frontend
        setCommentFormObject(emptyCommentFormObject)
    }

    handleInputChange = (id, text) => {
        setCommentFormObject(()=>{return(
            {...commentFormObject, [id]: text}
        )})
    }


    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <>
            <Text>TESTING! IN PROGRESS</Text>
            <Button
                title = 'Submit New Observation'
                onPress={handleSubmitObservation}
            ></Button>
            <View>
            <TextInput
                placeholder = 'Add your comment here!'
                numberOfLines = {4}
                maxLength = {50}
                onChangeText = {(text)=>{handleInputChange('comment', text)}}
                value = {commentFormObject.comment}
            />
            </View>
            
        </>
        
    )
}

export default NewObservation
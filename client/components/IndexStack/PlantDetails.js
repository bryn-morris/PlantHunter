import { View, Text } from 'react-native'

function PlantDetails({route}) {
    
    const specificPlant = route.params.plant

    // want to be able to click on the text/button/icon with the relevant info 
    // to edit the details on the card, pass that prop back to index
    // so that updates are rendered there if the image is updated
    // and send a fetch to update the backend

    return (
        <View>
            <Text>Plant Details Page</Text>
        </View>
    )

}

export default PlantDetails  
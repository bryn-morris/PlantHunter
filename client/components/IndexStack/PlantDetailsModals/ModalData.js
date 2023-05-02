import { View, Text } from "react-native"  
 

function ModalData({eachObs}) {

    return(
        <View>
            <Text>{eachObs.comment}</Text>
            <Text>{eachObs.created_at}</Text>
            <Text>{eachObs.location}</Text>
            <Text>{eachObs.user.username}</Text>
        </View>
    )

}    

export default ModalData
    
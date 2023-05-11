import { View, Text, StyleSheet } from "react-native"  
 

function ModalData({eachObs}) {

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <View style = {styles.dataContainer}>
            <Text
                    style = {styles.usernameText}
                >{eachObs.user.username}</Text>
            <Text
                style = {styles.commentBody}
            >{eachObs.comment}</Text>
            <View style = {styles.signatureContainer}>
                <Text
                    style = {styles.creationTime}
                >{eachObs.created_at}</Text>
                <Text
                    style = {styles.locationBody}
                >{eachObs.location}</Text>
            </View>
        </View>
    )

}    

export default ModalData

const styles = StyleSheet.create({

    dataContainer: {
        flex: 1,
        padding: 30,
        paddingRight: 0,
        paddingLeft: 0,

    },
    usernameText: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingBottom: 10,
        textDecorationLine: "underline",
        color: "#4e372c",
    },
    commentBody: {
        padding:5,
    },
    signatureContainer: {
        flexDirection: "row",
        height:30,
    },
    creationTime: {
        position: "absolute",
        color: 'grey',
        fontSize: 13,
        fontWeight: 'bold',
        padding:5,
        left: "0%",
        bottom: "0%",
    },
    locationBody: {
        position: "absolute",
        color: '#4e372c',
        fontSize: 13,
        fontWeight: 'bold',
        padding:5,
        right: "0%",
        bottom: "0%",
        fontStyle: "italic",
    },

})
    
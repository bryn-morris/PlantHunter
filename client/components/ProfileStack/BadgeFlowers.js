import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native'; 

function BadgeFlowers(){

    const flowerArray = Array.from({length:15}, () => "md-flower")

    return(
        <View style = {StyleSheet.badgeFlowersContainer}>
            {flowerArray.map((eachIcon, eachIndex)=>(
                <Ionicons
                    key = {eachIndex}
                    name = {eachIcon}
                    size = {24}
                    style = {styles[`badgeFlower${eachIndex}`]}
                />
            ))}
        </View>
    )
}

export default BadgeFlowers

const styles = StyleSheet.create({

    badgeFlowersContainer: {
        backgroundColor: "#fff",
        position: "absolute",
        width: "100%",
        height: 100,
        zIndex: 10,
        top: 0,
    },
    badgeFlower0 : {
        position: "absolute",
    },
    badgeFlower1 : {

    },
    badgeFlower2 : {

    },
    badgeFlower3 : {

    },
    badgeFlower4 : {

    },
    badgeFlower5 : {

    },
    badgeFlower6 : {

    },
    badgeFlower7 : {

    },
    badgeFlower8 : {

    },
    badgeFlower9 : {

    },
    badgeFlower10 : {

    },
    badgeFlower11 : {

    },
    badgeFlower12 : {

    },
    badgeFlower13 : {

    },
    badgeFlower14 : {

    },
})


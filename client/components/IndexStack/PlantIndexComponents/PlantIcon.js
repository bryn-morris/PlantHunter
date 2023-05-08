import { View, Image, StyleSheet, Text, Button } from "react-native"
import { useContext } from "react"
import { PlantContext } from "../../../context/PlantContext"
import { AuthContext } from '../../../context/AuthContext'
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons/FontAwesome';

function PlantIcon ({eachPl, renderDetailPage, deletionAddition, doomedIndices, setDoomedIndices}) {

    const { userPlants, setUserPlants } = useContext(PlantContext)
    const { userToken } = useContext(AuthContext)

    ////////////////////////////////////////////////
    ///////  Deletion on Backend & Frontend
    ////////////////////////////////////////////////

    function deletionFetch(doomedID){

        setDoomedIndices(
            [...doomedIndices].filter((each)=>each !== doomedID)
        )

        fetch(`https://customngrok.ngrok.app/plantsbyuser/${doomedID}`,{
            method: "DELETE",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            }
        })
        
        setUserPlants(
            [...userPlants].filter(each => each.id !== doomedID)
        )            
    }

    ////////////////////////////////////////////////
    ///////  Icon to Render
    ////////////////////////////////////////////////

    return(
        <View>
            <TouchableOpacity
                // style = {styles.touchableIcon}
                key={eachPl.observations.id}
                onPress={()=> renderDetailPage(eachPl)}
                onLongPress={()=>{deletionAddition(eachPl.id)}}
            >
                <View>
                    <Image 
                        key={eachPl.observations.id} 
                        source = {{uri: eachPl.image}} 
                        style = {styles.image}
                    />
                    <Text
                        style = {styles.title}
                    >{eachPl.name}</Text>
                </View>
            </TouchableOpacity>
            {
                doomedIndices.includes(eachPl.id) ?
                <Button
                    key = {eachPl.observations.id + "-button"} 
                    title="Delete"
                    onPress={()=>deletionFetch(eachPl.id)}/>:
                // <FontAwesome 
                //     key = {eachPl.observations.id + "-button"} 
                //     onPress={()=>deletionFetch(eachPl.id)}
                //     style = {styles.IconContainer}
                //     name = 'flower'
                //     size = {20}
                // />:
                null
            }
        </View>
        
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 130,
        resizeMode: 'cover',
        margin: 30,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'black',
    },
    title:{
        textAlign: 'center',
    },
  });

export default PlantIcon
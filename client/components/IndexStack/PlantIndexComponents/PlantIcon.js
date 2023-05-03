import { TouchableHighlight, Image, StyleSheet, Button, Text } from "react-native"
import { useContext } from "react"
import { PlantContext } from "../../../context/PlantContext"
import { AuthContext } from '../../../context/AuthContext'

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
        <TouchableHighlight 
            key={eachPl.observations.id}
            onPress={()=> renderDetailPage(eachPl)}
            onLongPress={()=>{deletionAddition(eachPl.id)}}
        >
            <>
                <Image 
                    key={eachPl.observations.id} 
                    source = {{uri: eachPl.image}} 
                    style = {styles.image}
                />
                <Text
                    style = {styles.title}
                >{eachPl.name}</Text>
                {
                doomedIndices.includes(eachPl.id) ?
                <Button
                    key = {eachPl.observations.id + "-button"} 
                    title="Delete"
                    onPress={()=>deletionFetch(eachPl.id)}/>: 
                null
                }
                
            </>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin: 30
    },
    title:{
        textAlign: 'center',
    }
  });

export default PlantIcon
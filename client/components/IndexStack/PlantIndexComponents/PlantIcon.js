import { View, Image, StyleSheet, Text, Button } from "react-native"
import { useContext } from "react"
import { PlantContext } from "../../../context/PlantContext"
import { AuthContext } from '../../../context/AuthContext'
import { TouchableOpacity } from 'react-native';


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
        <View style={styles.container}>
            <TouchableOpacity
                // style = {styles.touchableIcon}
                key={eachPl.observations.id}
                onPress={()=> renderDetailPage(eachPl)}
                onLongPress={()=>{deletionAddition(eachPl.id)}}
                style = {styles.touchableIcon}
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
                <TouchableOpacity 
                    style={styles.Xbutton}
                    key = {eachPl.observations.id + "-button"} 
                    onPress={()=>deletionFetch(eachPl.id)}
                >
                    <Text style={styles.text}>X</Text>
                </TouchableOpacity>:
                
                // <Button
                //     key = {eachPl.observations.id + "-button"} 
                //     title="Delete"
                //     onPress={()=>deletionFetch(eachPl.id)}/>:
                null
            }
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
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
        top: -20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    Xbutton: {
        position: 'absolute',
        top: 0,
        right: 30,
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
        paddingVertical: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#f18f01',
    }
  });

export default PlantIcon
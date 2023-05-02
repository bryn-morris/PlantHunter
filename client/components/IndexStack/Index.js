import { Text, Image, ScrollView, View, StyleSheet, TouchableHighlight, Button } from "react-native"
import { useContext, useEffect, useState } from "react"
import { PlantContext } from "../../context/PlantContext"
import { AuthContext } from '../../context/AuthContext';


function Index({navigation}){

    const { userToken } = useContext(AuthContext)
    const { userPlants, setUserPlants } = useContext(PlantContext)
    const [ doomedIndices, setDoomedIndices ] = useState([])

    ////////////////////////////////////////////////
    ///////   Patch from Plant Details
    ////////////////////////////////////////////////

    const handleFormSubmit = (formObj) => {
        fetch (`https://customngrok.ngrok.app/plantsbyuser/${formObj.id}`,{
            method: "PATCH",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            },
            body: JSON.stringify(formObj)
        })
        .then(r=>r.json())
        .then(updatedPlant=>{
            setUserPlants(
                userPlants.map((eachPlant)=>{
                    if (eachPlant.id == updatedPlant.id){
                        return updatedPlant
                    } else{
                        return eachPlant
                    }
                }))
            }
        ) 
    }


    ////////////////////////////////////////////////
    ///////   GET for all Plants from DB
    ////////////////////////////////////////////////
    useEffect( ()=> {
        fetch ('https://customngrok.ngrok.app/plantsbyuser', {
            method: "GET",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            }
        })
            .then(r=>r.json())
            .then(plants => {
                setUserPlants(plants)
            })
    }
    ,[])

    ////////////////////////////////////////////////
    ///////  Pass State & Reroute to Plant Details
    ////////////////////////////////////////////////

    function renderDetailPage (eachPl) {
        navigation.navigate('PlantDetails', { 
            plant: eachPl,
            //possibly pass handleformsubmit through navigation.options?
            handleFormSubmit: handleFormSubmit
        })
        setDoomedIndices([])
    }

    ////////////////////////////////////////////////
    ///////  Deletion to State
    ////////////////////////////////////////////////

    function deletionAddition (doomedID) {
        const checkState = doomedIndices.findIndex((eachElement)=> eachElement === doomedID)
        
        if (checkState == -1){
            setDoomedIndices([...doomedIndices, doomedID])
        } else {
            setDoomedIndices(
            [...doomedIndices].filter((each)=>each !== doomedID)
            )
        }
    }

    function deletionFetch(doomedID){

        setDoomedIndices(
            [...doomedIndices].filter((each)=>each !== doomedID)
        )

        //deletion from backend
        fetch(`https://customngrok.ngrok.app/plantsbyuser/${doomedID}`,{
            method: "DELETE",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            }
        })
        //deletion from frontend
        
        setUserPlants(
            // userPlants.map((eachPlant)=>{
            //     if (eachPlant.id !== doomedID) {
            //         return eachPlant
            //     }
            // })
            [...userPlants].filter(each => each.id !== doomedID)
        )
                     
    }

        // update frontend

    
    
    // add search function to search filter through plant objects that return
    // from fetch - likely basd on plant name or location

    // render plant images on screen and make htem have an effect on press

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    const halfOfUP = userPlants ? Math.ceil(userPlants.length/2) : null

    return(userPlants ?
        <ScrollView style = {styles.scrollView}>
        <View style = {styles.container}>
            <View style = {styles.column}>
                {userPlants.slice(0,halfOfUP).map(
                    (eachPl)=>{return(
                        <>
                            <TouchableHighlight 
                                key={eachPl.observations.id}
                                onPress={()=> renderDetailPage(eachPl)}
                                onLongPress={()=>{deletionAddition(eachPl.id)}}
                            >
                                <Image 
                                    key={eachPl.observations.id} 
                                    source = {{uri: eachPl.image}} 
                                    style = {styles.image}
                                />
                            </TouchableHighlight>
                            <>
                            {
                                doomedIndices.includes(eachPl.id) ?
                                <Button
                                    // key = {eachPL.observations.id} 
                                    title="TESTING"
                                    onPress={()=>deletionFetch(eachPl.id)}/>: 
                                null
                            }
                            </>
                        </>
                    )}
                )}
            </View>
            <View style = {styles.column}>
                {userPlants.slice(halfOfUP).map(
                    (eachPl)=>{return(
                        <TouchableHighlight 
                            key = {eachPl.observations.id} 
                            onPress={()=> renderDetailPage(eachPl)}
                            onLongPress={()=>{deletionAddition(eachPl.id)}}
                        >
                            <Image 
                                key={eachPl.observations.id} 
                                source = {{uri: eachPl.image}} 
                                style = {styles.image}
                        />
                        </TouchableHighlight> 
                    )}
                )}
            </View>
        </View>
    </ScrollView>:
    <Text>Loading...</Text>
    )    
}

    ////////////////////////////////////////////////
    ///////  Styling
    ////////////////////////////////////////////////

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 100
    },
    column: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1,
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      margin: 10
    },
  });

  export default Index
import { Text, Image, ScrollView, View, StyleSheet, TouchableHighlight, Button } from "react-native"
import { useContext, useEffect, useState } from "react"
import { PlantContext } from "../../context/PlantContext"
import { AuthContext } from '../../context/AuthContext';
import PlantIcon from "./PlantIcon";


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

            //Why do I need to return an array that has the same length as
            // the initial one and then filter through to remove null? 

            // userPlants.map((eachPlant)=>{
            //     if (eachPlant.id !== doomedID) {
            //         return eachPlant
            //     } else {
            //         return null
            //     }
            // }
            // ).filter(eachPlant => eachPlant !== null))
            [...userPlants].filter(each => each.id !== doomedID)
        )
        
                     
    }

        // update frontend

    
    
    // add search function to search filter through plant objects that return
    // from fetch - likely basd on plant name or location

    // render plant images on screen and make htem have an effect on press

    const plantIconPropsObj = {
        renderDetailPage: renderDetailPage,
        deletionAddition: deletionAddition,
        doomedIndices: doomedIndices,
    }

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    //this NEEDS a refactor - likely using flatlist

    const halfOfUP = userPlants ? Math.ceil(userPlants.length/2) : null

    return(userPlants ?
        <ScrollView style = {styles.scrollView}>
        <View style = {styles.container}>
            <View style = {styles.column}>
                {userPlants.slice(0,halfOfUP).map(
                    (eachPl)=>{return(
                        <PlantIcon 
                            eachPl = {eachPl}
                            {...plantIconPropsObj}
                        />
                    )}
                )}
            </View>
            <View style = {styles.column}>
                {userPlants.slice(halfOfUP).map(
                    (eachPl)=>{return(
                        <PlantIcon 
                            eachPl = {eachPl}
                            renderDetailPage = {renderDetailPage}
                            deletionAddition = {deletionAddition}
                            doomedIndices = {doomedIndices}
                        />
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
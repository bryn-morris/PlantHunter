import { Text, StyleSheet, FlatList } from "react-native"
import { useContext, useEffect, useState } from "react"
import { PlantContext } from "../../context/PlantContext"
import { AuthContext } from '../../context/AuthContext';
import PlantIcon from "./PlantIcon";


function Index({navigation}){

    const { userToken } = useContext(AuthContext)
    const { userPlants, setUserPlants } = useContext(PlantContext)
    const [ doomedIndices, setDoomedIndices ] = useState([])

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

    ////////////////////////////////////////////////
    ///////  Pass State & Reroute to Plant Details
    ////////////////////////////////////////////////

    function renderDetailPage (eachPl) {
        navigation.navigate('PlantDetails', { 
            plant: eachPl,
        })
        setDoomedIndices([])
    }

    ////////////////////////////////////////////////
    ///////  Search Feature
    ////////////////////////////////////////////////
    
    // add search function to search filter through plant objects that return
    // from fetch - likely basd on plant name or location

    ////////////////////////////////////////////////
    ///////  Filter Feature
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////
    ///////  Props Objects
    ////////////////////////////////////////////////

    const plantIconPropsObj = {
        renderDetailPage: renderDetailPage,
        doomedIndices: doomedIndices,
        setDoomedIndices: setDoomedIndices,
        deletionAddition: deletionAddition,
    }

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
            userPlants ?
            <FlatList
                data={userPlants}
                nestedScrollEnabled = {true}
                style = {styles.container}
                numColumns={2}
                contentContainerStyle={styles.container}
                keyExtractor={(item) => item.observations.id}
                renderItem={({ item }) => (
                    <PlantIcon eachPl={item} {...plantIconPropsObj} />
                )}
            />
            :
            <Text>Loading...</Text> 
    )    
}

    ////////////////////////////////////////////////
    ///////  Styling
    ////////////////////////////////////////////////


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 90
    },
  });

  export default Index
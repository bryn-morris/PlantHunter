import { Text, StyleSheet, FlatList } from "react-native"
import { useContext, useEffect, useState } from "react"
import { PlantContext } from "../../context/PlantContext"
import { AuthContext } from '../../context/AuthContext';
import PlantIcon from "./PlantIndexComponents/PlantIcon";
import LogOutModal from "../Login and Auth/LogOutModal";
import PlantSearch from "./PlantIndexComponents/PlantSearch";
import * as Haptics from 'expo-haptics';


function Index({navigation}){

    const { userToken, logOutModalVisible, setLogOutModalVisible } = useContext(AuthContext)
    const { userPlants, setUserPlants } = useContext(PlantContext)

    const [ doomedIndices, setDoomedIndices ] = useState([])
    const [ searchString, setSearchString ] = useState('')

    // May Need to refactor to get observations instead of plants once
    // Compendium is set up

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
            .then(r=>{
                if (!r.ok) {
                    setLogOutModalVisible(true)
                };
                return r.json()})
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
            Haptics.selectionAsync()
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
    
    const filteredByName = 
         userPlants && userPlants.length > 0 ?
        [...userPlants].filter(
            (eachObj)=>eachObj.name.toLowerCase().includes(
            searchString.toLowerCase()
            )    
        ) : 
        null
    
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

    const logOutModalPropsObj = {
        navigation: navigation,
    }

    const plantSearchPropsObj = {
        setSearchString: setSearchString,
        searchString: searchString   
    }

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <>
            {userPlants ?
            <>
            <PlantSearch {...plantSearchPropsObj}/>
            <FlatList
                data={userPlants ? filteredByName : null}
                nestedScrollEnabled = {true}
                style = {styles.container}
                numColumns={2}
                contentContainerStyle={styles.container}
                keyExtractor={(item) => item.observations[0].id}
                renderItem={({ item }) => (
                    <PlantIcon eachPl={item} {...plantIconPropsObj} />
                )}
            />
            </>
            :
            <Text>Loading...</Text>}
            {logOutModalVisible ?
            <LogOutModal {...logOutModalPropsObj}/>:
            null}
        </>
            
    )    
}

    ////////////////////////////////////////////////
    ///////  Styling
    ////////////////////////////////////////////////


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 90,
        minHeight: '100%',
        paddingBottom: 100,
    },
  });

  export default Index
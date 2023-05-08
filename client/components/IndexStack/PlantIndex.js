import { Text, StyleSheet, FlatList, View } from "react-native"
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
        <View style = {styles.container}>
            {userPlants ?
            <>
            <View style={styles.searchcontainer}>
                <PlantSearch 
                    {...plantSearchPropsObj}           
                />
            </View>
            <View style = {styles.listcontainer}>
                <FlatList
                    data={userPlants ? filteredByName : null}
                    nestedScrollEnabled = {true}
                    style = {styles.container}
                    numColumns={2}
                    contentContainerStyle={styles.flatlist}
                    keyExtractor={(item) => item.observations[0].id}
                    renderItem={({ item }) => (
                        <PlantIcon eachPl={item} {...plantIconPropsObj} />
                    )}
                />
            </View>
            </>
            :
            <Text>Loading...</Text>}
            {logOutModalVisible ?
            <LogOutModal {...logOutModalPropsObj}/>:
            null}
        </View>
            
    )    
}

    ////////////////////////////////////////////////
    ///////  Styling
    ////////////////////////////////////////////////


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafcee",
    },
    flatlist: {
        paddingHorizontal: 35,
        paddingTop: 10,
        minHeight: '100%',
        paddingBottom: 100,
    },
    searchcontainer: {
        flex: 1/4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#d5ceae",
    },
    listcontainer: {
        flex: 2,
        backgroundColor: "#fff",
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: "#fafcee"
    }
  });

  export default Index
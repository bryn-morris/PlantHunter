import { Text, StyleSheet, FlatList } from "react-native"
import { useContext, useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store';
import { PlantContext } from "../../context/PlantContext"
import { AuthContext } from '../../context/AuthContext';
import PlantIcon from "./PlantIcon";
import LogOutModal from "../Login and Auth/LogOutModal";


function Index({navigation}){

    const { userToken, setUserToken } = useContext(AuthContext)
    const { userPlants, setUserPlants } = useContext(PlantContext)
    const [ doomedIndices, setDoomedIndices ] = useState([])
    const [ logOutModalVisible, setLogOutModalVisible ] = useState(false) 

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

    const logOutModalPropsObj = {
        navigation: navigation, 
        logOutModalVisible: logOutModalVisible,
        setLogOutModalVisible: setLogOutModalVisible, 
    }

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
            <>
                {userPlants ?
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
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 90
    },
  });

  export default Index
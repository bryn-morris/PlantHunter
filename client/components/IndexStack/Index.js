import { Text, Image, ScrollView, View, StyleSheet, TouchableHighlight } from "react-native"
import { useContext, useEffect } from "react"
import { PlantContext } from "../../context/PlantContext"
import { AuthContext } from '../../context/AuthContext';


function Index({navigation}){

    const { userToken } = useContext(AuthContext)
    const { userPlants, setUserPlants } = useContext(PlantContext)

    // State for Edit Form in PlantDetails
    
    const handleFormSubmit = (formObj) => {
        fetch (`https://9708-174-74-7-135.ngrok-free.app/plantsbyuser/${formObj.id}`,{
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


    //Fetch for Index and Plant Data, may want to implement caching and move
    // this useEffect around after MVP is hit on refactor
    // This currently fires again when 
    useEffect( ()=> {
        fetch ('https://9708-174-74-7-135.ngrok-free.app/plantsbyuser', {
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
    
    //pass info straight to fronted on submit edit button in edit modal
    // create a piece fo state and update it with use effect so that the 
    // plant configuration object is forcibly re-renedered - put the userplants
    // in context so it can be accessed by plant details, then filter through
    // to check to compare id's to find the right array element and use that
    // info to populate page and modal

    function renderDetailPage (eachPl) {
        navigation.navigate('PlantDetails', { 
            plant: eachPl,
            //possibly pass handleformsubmit through navigation.options?
            handleFormSubmit: handleFormSubmit
        })
    }



    function renderIndexImages () {

            if (userPlants){
                const halfOfUP = Math.ceil(userPlants.length/2)
        
                return(
                    <ScrollView style = {styles.scrollView}>
                        <View style = {styles.container}>
                            <View style = {styles.column}>
                                {userPlants.slice(0,halfOfUP).map(
                                    (eachPl)=>{return(
                                        <TouchableHighlight key={eachPl.id} onPress={()=> renderDetailPage(eachPl)}>
                                            <Image 
                                                key={eachPl.id} 
                                                source = {{uri: eachPl.image}} 
                                                style = {styles.image}
                                        />
                                        </TouchableHighlight>
                                    )}
                                )}
                            </View>
                            <View style = {styles.column}>
                                {userPlants.slice(halfOfUP).map(
                                    (eachPl)=>{return(
                                        <TouchableHighlight key = {eachPl.id} onPress={()=> renderDetailPage(eachPl)}>
                                            <Image 
                                                key={eachPl.id} 
                                                source = {{uri: eachPl.image}} 
                                                style = {styles.image}
                                        />
                                        </TouchableHighlight> 
                                    )}
                                )}
                            </View>
                        </View>
                    </ScrollView>
                )
            } else{
                return(<Text>Loading...</Text>)
            }
    }
    
    // add search function to search filter through plant objects that return
    // from fetch - likely basd on plant name or location

    // render plant images on screen and make htem have an effect on press

    return(renderIndexImages() )
}

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
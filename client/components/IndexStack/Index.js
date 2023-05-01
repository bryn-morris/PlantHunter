import { Text, Image, ScrollView, View, StyleSheet, TouchableHighlight } from "react-native"
import { useContext, useEffect } from "react"
import { PlantContext } from "../../context/PlantContext"
import { AuthContext } from '../../context/AuthContext';


function Index({navigation}){

    const { userToken } = useContext(AuthContext)
    const { userPlants, setUserPlants } = useContext(PlantContext)

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

    function renderDetailPage (eachPl) {
        navigation.navigate('PlantDetails', { plant: eachPl })
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
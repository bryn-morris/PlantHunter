import { Text, StyleSheet, FlatList, View } from "react-native"
import { useContext, useEffect, useState } from "react"
import { PlantContext } from "../../context/PlantContext"
import { AuthContext } from '../../context/AuthContext';
import PlantIcon from "./PlantIndexComponents/PlantIcon";
import LogOutModal from "../Login and Auth/LogOutModal";
import PlantSearch from "./PlantIndexComponents/PlantSearch";
import * as Haptics from 'expo-haptics';
import LogOutButton from "../Login and Auth/LogOutButton";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Keyboard } from "react-native";


function Index({navigation}){

    const { 
        userToken, 
        logOutModalVisible, 
        setLogOutModalVisible,
        username,
    } = useContext(AuthContext);
    const { userPlants, setUserPlants } = useContext(PlantContext);
    const [ doomedIndices, setDoomedIndices ] = useState([]);
    const [ searchString, setSearchString ] = useState('');
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

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
    ///////  KeyBoard Events Listeners
    ////////////////////////////////////////////////

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener('keyboardDidShow',(e) =>
            {
                setIsKeyboardVisible(true);
            },
        );
        const keyboardHideListener = Keyboard.addListener('keyboardDidHide',({nativeEvent}) =>
            {
                setIsKeyboardVisible(false);
            },
        );
    
        // cleanup
        return () => {
          keyboardShowListener.remove();
          keyboardHideListener.remove();
        };
      }, []);

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
            <View style = {styles.headerContainer}>
                {isKeyboardVisible ? null :
                <>
                    <LogOutButton navigation = {navigation}/>
                    <View style = {styles.usernameContainer}>
                        <FontAwesome 
                            name="user-circle-o" 
                            style = {styles.usernameIcon}
                        />
                        {username && (
                            <Text
                                style = {styles.usernameText}
                            >{username}
                            </Text>
                        )}
                    </View>
                </>    
                }
            </View>
            {userPlants ?
            <>
            <View style={styles.searchcontainer}>
                <Ionicons  
                        name="search"
                        size={40} 
                        color="#ffbf00" 
                        style = {styles.searchIcon}
                />
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
        paddingHorizontal: 10,
        paddingTop: 10,
        minHeight: '100%',
        paddingBottom: 100,
    },
    searchcontainer: {
        flex: 1/2,
        top: "13%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#d5ceae",
        elevation: 5,
    },
    searchIcon: {
        position: 'absolute',
        color: '#4e372c',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 8,
        textShadowColor: '#5A5A5A',
        zIndex: 1,
        right: "15%",
        top:"30%",
    },
    listcontainer: {
        top: "15%",
        flex: 2,
        backgroundColor: "#fff",
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: "#fafcee"
    },
    headerContainer: {
        backgroundColor:"#fafcee",
        flex:1/3,
        top: "1%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    usernameContainer: {
        position: 'absolute',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fafcee',
        height:"70%",
        width:"30%",
        left:30,
        bottom:-21,
    },
    usernameIcon: {
        fontSize: 30,
        color: "#4e372c",
    },
    usernameText: {
        color: '#4e372c',
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
    },
  });

  export default Index
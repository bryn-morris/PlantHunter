import { Text, Modal, TouchableOpacity, SectionList, StyleSheet } from "react-native"
import ModalData from "./ModalData"
import { useContext } from "react"
import { PlantContext } from "../../../context/PlantContext"


function PlantUsers({modalVisible, setModalVisible, specificPlant}){

    // Add search bar in here to search usernames?

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    const sections = [
        {
            title: 'User Observations',
            data: specificPlant.observations,
        },
    ];

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <>
            <Modal
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={()=> setModalVisible(false)}
                >
                    <TouchableOpacity 
                        key={specificPlant.id}
                        style={styles.closeButton} 
                        onPress={()=>setModalVisible(false)}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>  
                    <SectionList 
                        sections={sections}
                        nestedScrollEnabled = {true}
                        style = {styles.container}
                        contentContainerStyle={styles.container}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ModalData key = {item.id} eachObs={item}/>      
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.sectionHeader}>{title}</Text>
                        )}
                    />
                    {specificPlant.observations.map(
                        (eachObs)=><ModalData key = {eachObs.id} eachObs={eachObs} />
                    )}
            </Modal>
            
        </>     
    )
}

export default PlantUsers

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 90,
        minHeight: '100%',
        paddingBottom: 100,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 5,
    },
});
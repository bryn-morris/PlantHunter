import { 
    Text, 
    Modal, 
    TouchableOpacity, 
    SectionList, 
    StyleSheet,
    View, 
} from "react-native"
import ModalData from "./ModalData"



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
        <View style = {styles.outerModalcontainer}>
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={()=> setModalVisible(false)}
                transparent = {true}
            >
                <View style = {styles.innerModalContainer}>
                    <TouchableOpacity 
                        key={specificPlant.id}
                        style={styles.closeButton} 
                        onPress={()=>setModalVisible(false)}
                    >
                        <Text
                            style = {styles.closeText}
                        >Close</Text>
                    </TouchableOpacity>  
                    <View style = {styles.listcontainer}>
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
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </View>
                </View>
            </Modal>
        </View>     
    )
}

export default PlantUsers

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 20,
        minHeight: '100%',
        paddingBottom: 50,
    },
    sectionHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
    },
    outerModalcontainer: {
        flex: 1,
    },
    innerModalContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fafcee',
        height: "74%",
        top:  "18%",
        borderRadius: 50,
        elevation: 5,
    },
    closeButton: {
        position:"absolute",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#4e372c",
        height: 40,
        width: "50%",
        borderRadius: 30,
        bottom:"3%",
    },
    closeText: {
        color: '#ffbf00',
        fontSize: 18,
        fontWeight: 'bold'
    },
    listcontainer: {
        top: "0%",
        flex: 2,
        backgroundColor: "#fff",
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: "#fafcee"
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
      },
});
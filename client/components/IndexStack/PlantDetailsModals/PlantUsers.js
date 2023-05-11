import { 
    Text, 
    Modal, 
    TouchableOpacity, 
    SectionList, 
    StyleSheet,
    View, 
} from "react-native"
import ModalData from "./ModalData"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';  



function PlantUsers({modalVisible, setModalVisible, specificPlant}){

    // Add search bar in here to search usernames?

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    const sections = [
        {
            title: 'Users\' Comments',
            data: specificPlant.observations,
            footer: (<TouchableOpacity 
                        key={specificPlant.id}
                        style={styles.closeButton} 
                        onPress={()=>setModalVisible(false)}
                    >
                        <Text
                            style = {styles.closeText}
                        >Close</Text>
                    </TouchableOpacity>) 
        },
    ];

    ////////////////////////////////////////////////
    ///////  Render On This Page
    ////////////////////////////////////////////////

    return(
        <View style = {styles.outerModalcontainer}>
            <Modal
                visible={modalVisible}
                animationType="fade"
                onRequestClose={()=> setModalVisible(false)}
                transparent = {true}
            >
                <View style = {styles.innerModalContainer}>
                <Ionicons 
                    name="md-radio-button-on" 
                    style = {
                        {
                            ...styles.plantUsersIcon,
                            left:"-8%",
                            top:"-8%",
                            transform: [{rotate: "45deg"}]
                        }
                    }
                />
                <Ionicons 
                    name="md-radio-button-on"  
                    style = {
                        {
                            ...styles.plantUsersIcon,
                            transform: [{rotateY: "180deg"},{rotate: "45deg"}],
                            right: "-8%",
                            top:"-8%",
                        }
                    } 
                />
                <Ionicons 
                    name="md-radio-button-on"  
                    style = {
                        {
                            ...styles.plantUsersIcon,
                            transform: [{rotateY: "180deg"},{rotate: "45deg"}],
                            right: "-8%",
                            bottom: "-8%",
                        }
                    } 
                />
                <Ionicons 
                    name="md-radio-button-on"  
                    style = {
                        {
                            ...styles.plantUsersIcon,
                            transform: [{rotateY: "180deg"},{rotate: "45deg"}],
                            left: "-8%",
                            bottom: "-8%",
                        }
                    } 
                />
                     
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
                            renderSectionFooter={({ section:  { footer } }) => footer }
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
        paddingBottom: 70,
    },
    sectionHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
        color: "#4e372c",
        textDecorationLine: "underline",
    },
    outerModalcontainer: {
        flex: 1,
    },
    innerModalContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fafcee',
        height: "68%",
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
        width: "60%",
        borderRadius: 30,
        bottomPadding: 10,
        zIndex: 10,
        left: "20%",
    },
    closeText: {
        color: '#ffbf00',
        fontSize: 18,
        fontWeight: 'bold'
    },
    listcontainer: {
        top: "0%",
        flex: 2,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
    },
    plantUsersIcon: {
        color: "black",
        fontSize: 90,
        position: "absolute",
    },
});
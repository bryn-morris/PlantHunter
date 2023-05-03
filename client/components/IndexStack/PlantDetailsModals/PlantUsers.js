import { Text, Modal, TouchableOpacity } from "react-native"
import ModalData from "./ModalData"


function PlantUsers({modalVisible, setModalVisible, specificPlant}){

    //Likely going to want to rerender the ModalData into a sectionList
    // Add search bar in here to search usernames?
    
    return(
        <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={()=> setModalVisible(false)}
        >
            {specificPlant.observations.map(
                (eachObs)=><ModalData key = {eachObs.id} eachObs={eachObs} />
            )}
            <TouchableOpacity 
                key={specificPlant.id} 
                onPress={()=>setModalVisible(false)}
            >
                <Text>Close</Text>
            </TouchableOpacity>
        </Modal>
    )
}

export default PlantUsers
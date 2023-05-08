import { TextInput, StyleSheet } from "react-native"

function PlantSearch({searchString, setSearchString}){

    const handleSearchString = (text) => {
        setSearchString(text)
    } 

    return(
            <TextInput 
                onChangeText={handleSearchString}
                placeholder="Search by name here!"
                placeholderTextColor = "#d5ceae"
                value={searchString}
                style = {styles.searchbar}
            />
    )
}

export default PlantSearch

    ////////////////////////////////////////////////
    ///////  Styling
    ////////////////////////////////////////////////

const styles = StyleSheet.create({
    searchbar: {
        backgroundColor: "#fafcee",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#ccc",
        top:10,
        height: 40,
        width: "80%",
        paddingLeft: 20,
        fontSize: 18,
        color: "#333",
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#4e372c",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})
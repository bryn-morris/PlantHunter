import { TextInput } from "react-native"

function PlantSearch({searchString, setSearchString}){

    const handleSearchString = (text) => {
        setSearchString(text)
    } 

    return(
            <TextInput 
                onChangeText={handleSearchString}
                placeholder="Search by name here!"
                value={searchString}
            />
    )
}

export default PlantSearch
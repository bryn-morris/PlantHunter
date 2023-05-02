import { TouchableHighlight, Image, StyleSheet } from "react-native"

function PlantIcon ({eachPl, renderDetailPage, deletionAddition, doomedIndices}) {

    return(
        <TouchableHighlight 
            key={eachPl.observations.id}
            onPress={()=> renderDetailPage(eachPl)}
            onLongPress={()=>{deletionAddition(eachPl.id)}}
        >
            <>
                <Image 
                    key={eachPl.observations.id} 
                    source = {{uri: eachPl.image}} 
                    style = {styles.image}
                />
                {
                doomedIndices.includes(eachPl.id) ?
                <Button
                    key = {eachPl.observations.id + "-button"} 
                    title="Delete"
                    onPress={()=>deletionFetch(eachPl.id)}/>: 
                null
                }
            </>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    image: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      margin: 10
    },
  });

export default PlantIcon
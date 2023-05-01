import { createContext, useState } from "react"

const PlantContext = createContext()

function PlantProvider ({children}) {

    const [userPlants, setUserPlants] = useState(null)

    return (
        <PlantContext.Provider 
            value ={{
                        userPlants,
                        setUserPlants,
                    }}
        >
            {children}
        </PlantContext.Provider>
        )
}
export {PlantContext, PlantProvider}
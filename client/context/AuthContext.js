import { createContext, useState } from "react"

const AuthContext = createContext()

function AuthProvider ({children}) {

    const [userToken, setUserToken] = useState(null)
    const [logOutModalVisible, setLogOutModalVisible] = useState(false)

    return (
        <AuthContext.Provider 
            value ={{
                        userToken,
                        setUserToken,
                        logOutModalVisible,
                        setLogOutModalVisible
                    }}
        >
            {children}
        </AuthContext.Provider>
        )
}
export {AuthContext, AuthProvider}
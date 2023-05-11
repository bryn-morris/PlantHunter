import { createContext, useState } from "react"

const AuthContext = createContext()

function AuthProvider ({children}) {

    const [userToken, setUserToken] = useState(null)
    const [logOutModalVisible, setLogOutModalVisible] = useState(false)
    const [username, setUsername] = useState(null)

    return (
        <AuthContext.Provider 
            value ={{
                        userToken,
                        setUserToken,
                        logOutModalVisible,
                        setLogOutModalVisible,
                        username,
                        setUsername,
                    }}
        >
            {children}
        </AuthContext.Provider>
        )
}
export {AuthContext, AuthProvider}
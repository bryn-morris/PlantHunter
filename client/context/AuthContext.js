import { createContext, useState } from "react"

const AuthContext = createContext()

function AuthProvider ({children}) {

    const [userToken, setUserToken] = useState(null)

    return (
        <AuthContext.Provider 
            value ={{
                        userToken,
                        setUserToken,
                    }}
        >
            {children}
        </AuthContext.Provider>
        )
}
export {AuthContext, AuthProvider}
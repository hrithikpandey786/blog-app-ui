import React from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = React.useState(
        JSON.parse(localStorage.getItem("user")) || ""
    )


    const updateUser = (data) =>{
        setCurrentUser(data);
    }

    React.useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])

    return(
        <AuthContext.Provider value={{currentUser, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}


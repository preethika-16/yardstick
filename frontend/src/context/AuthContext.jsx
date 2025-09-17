import {createContext, useEffect,useState } from "react"

export const AuthContext=createContext()

const AuthContextProvider=({children})=>{
    const [user,setUser]=useState([])
    const [isLogin,setIsLogin]=useState(false)
    useEffect(()=>{
        if(!isLogin)return
        console.log(user)
    },[isLogin])
    return(
        <AuthContext.Provider value={{user,isLogin,setIsLogin,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider
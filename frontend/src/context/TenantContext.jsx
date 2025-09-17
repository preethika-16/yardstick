import {createContext } from "react"

export const TenantContext=createContext()

const TenantContextProvider=({children})=>{
    return(
        <TenantContext.Provider value={{}}>
            {children}
        </TenantContext.Provider>
    )
}

export default TenantContextProvider
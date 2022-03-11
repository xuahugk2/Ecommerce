import React, {createContext, useState} from "react"


export const GlobalSate = createContext()

export const DataProvider = ({children}) => {
    return (
        <GlobalSate.Provider value={'Value in Global'}>
            {children}
        </GlobalSate.Provider>
    )
}
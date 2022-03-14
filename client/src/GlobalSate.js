import React, {createContext, useState} from "react"
import ProductAPI from "./api/ProductAPI"

export const GlobalSate = createContext()

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false)

    const state = {
        token: [token, setToken],
        productsAPI: ProductAPI()
    }

    return (
        <GlobalSate.Provider value={state}>
            {children}
        </GlobalSate.Provider>
    )
}
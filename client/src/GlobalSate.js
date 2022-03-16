import axios from "axios"
import React, {createContext, useState, useEffect} from "react"
import ProductAPI from "./api/ProductAPI"
import UserAPI from "./api/UserAPI"

export const GlobalSate = createContext()

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false)

    const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token')

        setToken(res.data.accessToken)
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    }, [])

    const state = {
        token: [token, setToken],
        productsAPI: ProductAPI(),
        userAPI: UserAPI(token)
    }

    return (
        <GlobalSate.Provider value={state}>
            {children}
        </GlobalSate.Provider>
    )
}
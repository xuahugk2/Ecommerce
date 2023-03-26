import axios from "axios"
import React, {createContext, useState, useEffect} from "react"
import ProductAPI from "./api/ProductAPI"
import UserAPI from "./api/UserAPI"
import CategoriesAPI from "./api/CategoriesAPI"

export const GlobalSate = createContext()

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false)

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')

        if(firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get('/user/refresh_token')

                setToken(res.data.accessToken)

                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }

            refreshToken()
        }
    }, [])

    const state = {
        token: [token, setToken],
        productsAPI: ProductAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalSate.Provider value={state}>
            {children}
        </GlobalSate.Provider>
    )
}
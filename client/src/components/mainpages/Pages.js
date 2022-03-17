import React, {useContext} from 'react'
import {Routes, Route} from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/NotFound/NotFound'
import {GlobalSate} from '../../GlobalSate'

export default function Pages() {
    const state = useContext(GlobalSate)

    const [isLogged] = state.userAPI.isLogged

    return(
        <Routes>
            <Route path='/' element={<Products/>} />
            <Route path='/detail/:id' element={<DetailProduct/>} />
            <Route path='/login' element={isLogged ? <NotFound/> : <Login/>} />
            <Route path='/register' element={isLogged ? <NotFound/> : <Register/>} />
            <Route path='/cart' element={<Cart/>} />

            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

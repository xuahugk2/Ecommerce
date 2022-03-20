import React, {useContext} from 'react'
import {Routes, Route} from 'react-router-dom'
import {GlobalSate} from '../../GlobalSate'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/NotFound/NotFound'
import OrderHistory from './order/OrderHistory'
import OrderDetails from './order/OrderDetails'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'

export default function Pages() {
    const state = useContext(GlobalSate)

    const [isLogged] = state.userAPI.isLogged

    const [isAdmin] = state.userAPI.isAdmin

    return(
        <Routes>
            <Route path='/' element={<Products/>} />
            <Route path='/detail/:id' element={<DetailProduct/>} />

            <Route path='/login' element={isLogged ? <NotFound/> : <Login/>} />
            <Route path='/register' element={isLogged ? <NotFound/> : <Register/>} />

            <Route path='/cart' element={<Cart/>} />

            <Route path='/history' element={isLogged ? <OrderHistory/> : <Login/>} />
            <Route path='/history/:id' element={isLogged ? <OrderDetails/> : <Login/>} />

            <Route path='/category' element={isAdmin ? <Categories/> : <NotFound/>} />
            <Route path='/create_product' element={isAdmin ? <CreateProduct/> : <NotFound/>} />
            <Route path='/edit_product/:id' element={isAdmin ? <CreateProduct/> : <NotFound/>} />

            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

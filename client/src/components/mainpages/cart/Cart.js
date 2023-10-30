import React, { useContext, useState, useEffect, useMemo } from 'react'
import { GlobalSate } from '../../../GlobalSate'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import Loading from '../utils/loading/Loading'
import { useNavigate, Link } from 'react-router-dom'

export default function Cart() {
    const state = useContext(GlobalSate)

    const [cart, setCart] = state.userAPI.cart

    const [callback, setCallback] = state.productsAPI.callback

    const [token] = state.token

    const [total, setTotal] = useState(0)

    const salesTax = useMemo(() => {
        return total * 0.1
    }, [total])

    const price = useMemo(() => {
        return total + salesTax
    }, [total, salesTax])

    const [loading, setLoading] = useState(false)

    const history = useNavigate()

    useEffect(() => {
        setLoading(true)
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()
        setLoading(false)
    }, [cart])

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }

    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })

        setCart([...cart])

        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])

        addToCart(cart)
    }

    const removeProduct = id => {
        if (window.confirm('Do you want to remove this product from your cart?')) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])

            addToCart(cart)
        }
    }

    const tranSuccess = async (payment) => {
        const { paymentID } = payment

        await axios.post('/api/payment', { cart, paymentID }, {
            headers: { Authorization: token }
        })

        cart.forEach(async product => {
            await axios.post(`/api/quantity/${product._id}`, { sold: product.quantity }, {
                headers: { Authorization: token }
            })
        })

        setCart([])
        addToCart([])
        alert('You have successfully placed an order.')

        setCallback(!callback)
        history('/')
    }

    if (loading) {
        return <div><Loading /></div>
    }

    document.title = 'Cart'

    if (!token) {
        return (
            <div>
                <p className='message'>Please Login to see your cart!</p>
                <Link className='transition-button text-white bg-indigo-500 text-white px-6' to='/login'>Back to Login</Link>
            </div>
        )
    }

    if (cart.length === 0) {
        return <h2 className='message'>Cart Empty</h2>
    }

    return (
        <div className="container p-8 mx-auto mt-12">
            <div className="w-full overflow-x-auto">
                <div className="my-2">
                    <h3 className="text-xl font-bold tracking-wider">{`Shopping Cart ${cart.length} item`}</h3>
                </div>
                <table className="w-full shadow-inner">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 font-bold whitespace-nowrap">Image</th>
                            <th className="px-6 py-3 font-bold whitespace-nowrap">Product</th>
                            <th className="px-6 py-3 font-bold whitespace-nowrap">Qty</th>
                            <th className="px-6 py-3 font-bold whitespace-nowrap">Price</th>
                            <th className="px-6 py-3 font-bold whitespace-nowrap">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(product => (
                                <tr key={product.product_id}>
                                    <td>
                                        <div className="flex justify-center">
                                            <img src={product.images.url} className="object-cover h-28 w-28 rounded-2xl" alt="" />
                                        </div>
                                    </td>
                                    <td className="p-4 px-6 text-center whitespace-nowrap">
                                        <div className="flex flex-col items-center justify-center">
                                            <h3>{product.title}</h3>
                                        </div>
                                    </td>
                                    <td className="p-4 px-6 text-center whitespace-nowrap">
                                        <div>
                                            <button onClick={() => decrement(product._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-flex w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                            <input type="text" name="qty" value={product.quantity} className="w-12 text-center bg-gray-100 outline-none" disabled />
                                            <button onClick={() => increment(product._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-flex w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4 px-6 text-center whitespace-nowrap">{`$${product.price * product.quantity}`}</td>
                                    <td className="p-4 px-6 text-center whitespace-nowrap">
                                        <button onClick={() => removeProduct(product._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <div className="mt-4">
                    <div className="py-4 rounded-md shadow">
                        <h3 className="text-xl font-bold text-blue-600">Order Summary</h3>
                        <div className="flex justify-between px-4">
                            <span className="font-bold">Subtotal</span>
                            <span className="font-bold">{`$${total}`}</span>
                        </div>
                        <div className="flex justify-between px-4">
                            <span className="font-bold">Sales Tax</span>
                            <span className="font-bold">{`$${salesTax}`}</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-2 mt-3 border-t-2">
                            <span className="text-xl font-bold">Total</span>
                            <span className="text-2xl font-bold">{`$${price}`}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <PaypalButton total={total} tranSuccess={tranSuccess} />
                </div>
            </div>
        </div>
    )
}

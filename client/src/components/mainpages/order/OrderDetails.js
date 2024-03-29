import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalSate } from '../../../GlobalSate'

export default function OrderDetails() {
    const state = useContext(GlobalSate)

    const [history] = state.userAPI.history

    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id, history])

    if (orderDetails.length === 0) return null

    document.title = 'Order Detail'

    return (
        <div className='history-page'>
            <h2>Order Detail</h2>
            <table style={{ margin: "30px 0px" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.images.url} alt="" width='70' /></td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>$ {item.price * item.quantity}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

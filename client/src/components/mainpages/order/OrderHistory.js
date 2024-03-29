import React, { useContext, useEffect } from 'react'
import { GlobalSate } from '../../../GlobalSate'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function OrderHistory() {
    const state = useContext(GlobalSate)

    const [history, setHistory] = state.userAPI.history

    const [token] = state.token

    const [isAdmin] = state.userAPI.isAdmin

    document.title = 'History'

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axios.get('/api/payment', {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data)
                } else {
                    const res = await axios.get('/user/history', {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data)
                }
            }

            getHistory()
        }
    }, [token, isAdmin, setHistory])

    return (
        <div className="history-page">
            <h2>History</h2>

            <h4>You have {history.length} ordered</h4>

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Day of Purchased</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(item => (
                            <tr key={item._id}>
                                <td>{item.paymentID}</td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${item._id}`}><i className="fa-solid fa-eye"></i></Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

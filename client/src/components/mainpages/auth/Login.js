import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../utils/loading/Loading'

export default function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)

    const onChangeInput = (e) => {
        const { name, value } = e.target

        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            await axios.post('/user/login', { ...user })

            localStorage.setItem('firstLogin', true)

            window.location.href = "/"
        } catch (error) {
            if (error) alert(error.response.data.msg)
            window.location.reload()
        }
    }

    if (loading) {
        return <div><Loading /></div>
    }

    document.title = 'Login'

    return (
        <React.Fragment>
            <div className="min-h-full bg-white text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl mx-auto text-center w-4/5">
                    <span className="text-2xl font-light">Login to your account</span>
                    <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
                        <div className="h-2 bg-indigo-400 rounded-t-md"></div>
                        <form onSubmit={loginSubmit} className="py-6 px-8">
                            <label htmlFor='email-address' className="block font-semibold">Email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email"
                                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                                value={user.email}
                                onChange={onChangeInput}
                            />

                            <label htmlFor='password' className="block mt-3 font-semibold">Password</label>
                            <input
                                id='password'
                                name='password'
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="Password"
                                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                                value={user.password}
                                onChange={onChangeInput}
                            />

                            <div className="flex justify-between items-baseline">
                                <button type='submit' className="mt-4 bg-indigo-500 text-white py-1 px-6 rounded-lg">Login</button>
                                <Link to="/register" className="text-sm hover:underline">Create new account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

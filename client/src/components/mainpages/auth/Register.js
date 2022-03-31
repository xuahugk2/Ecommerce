import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Loading from '../utils/loading/Loading'

export default function Register() {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: ''
	})

	const [confirm, setConfirm] = useState('')

	const [loading, setLoading] = useState(false)

	const [message, setMessage] = useState('')

	useEffect(() => {
		if(user.password !== confirm) {
			setMessage('Confirm password incorrect!')
		} else {
			setMessage('')
		}
	}, [confirm, user.password])

	const onChangeInput = (e) => {
		const {name, value} = e.target

		setUser({...user, [name]:value})
	}

	const registerSubmit = async (e) => {
		e.preventDefault()

		setLoading(true)

			try {
				await axios.post('/user/register', {...user})

				localStorage.setItem('firstLogin', true)

				window.location.href = "/"
			} catch (error) {
				alert(error.response.data.msg)
			}
	}

	if(loading) {
		return <div><Loading/></div>
	}

	document.title = 'Register'

	return (
		<React.Fragment>
			<div className="min-h-full bg-white text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
				<div className="relative py-3 sm:max-w-xl mx-auto text-center w-4/5">
					<span className="text-2xl font-light">Register a new account</span>
					<div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
						<div className="h-2 bg-indigo-400 rounded-t-md"></div>
						<form onSubmit={registerSubmit} className="py-6 px-8">
							<label htmlFor='user-email' className="block font-semibold">Full Name</label>
							<input 
								id="user-email"
								name="name"
								type="text" 
								required
								placeholder="Full Name" 
								className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
								value={user.name}
								onChange={onChangeInput}
							/>

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

							<label htmlFor='confirm-password' className="block mt-3 font-semibold">Confirm Password</label>
							<input 
								id='confirm-password'
								name='confirm-password'
								type="password" 
								autoComplete="current-password"
								required
								placeholder="Confirm Password" 
								className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
								value={confirm} 
								onChange={(e) => setConfirm(e.target.value)}
							/>
							<span className='text-red-500'>{message}</span>
							
							<div className="flex justify-between items-baseline">
								{
									message ? <div className='mt-4 py-1 px-6'></div> : <button type='submit' className="mt-4 bg-indigo-500 text-white py-1 px-6 rounded-lg">Register</button>
								}
								<Link to="/login" className="text-sm hover:underline">Already have an account</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

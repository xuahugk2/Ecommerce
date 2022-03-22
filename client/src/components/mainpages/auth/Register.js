import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Loading from '../utils/loading/Loading'

export default function Register() {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: ''
	})

	const [loading, setLoading] = useState(false)

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
		<div className='auth-page'>
			<form onSubmit={registerSubmit}>
				<h2>Register</h2>

				<input type="text" name="name" id="name" required placeholder='Name' value={user.name} onChange={onChangeInput}/>
				
				<input type="email" name="email" id="email" required placeholder='Email' value={user.email} onChange={onChangeInput}/>
				
				<input type="password" name="password" id="password" required autoComplete='on' placeholder='Password' value={user.password} onChange={onChangeInput}/>

				<div className="row">
					<button type='submit'>Register</button>
					<Link to='/login'>Login</Link>
				</div>
			</form>
		</div>
	)
}

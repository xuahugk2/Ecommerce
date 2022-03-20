import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default function Login() {
	const [user, setUser] = useState({
		email: '',
		password: ''
	})

	const onChangeInput = (e) => {
		const {name, value} = e.target

		setUser({...user, [name]:value})
	}

	const loginSubmit = async (e) => {
		e.preventDefault()

		try {
			await axios.post('/user/login', {...user})

			window.location.href = "/"
		} catch (error) {
			alert(error.response.data.msg)
		}
	}

	return (
		<div className='auth-page'>
			<form onSubmit={loginSubmit}>
				<h2>Login</h2>

				<input type="email" name="email" id="email" required placeholder='Email' value={user.email} onChange={onChangeInput}/>
				
				<input type="password" name="password" id="password" required autoComplete='on' placeholder='Password' value={user.password} onChange={onChangeInput}/>

				<div className="row">
					<button type='submit'>Login</button>
					<Link to='/register'>Register</Link>
				</div>
			</form>
		</div>
	)
}

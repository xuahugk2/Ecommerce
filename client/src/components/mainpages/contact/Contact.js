import React, {useContext, useEffect, useState} from 'react'
import {GlobalSate} from '../../../GlobalSate'
import axios from 'axios'

export default function Contact() {

	const [contact, setContact] = useState([{
		name: ''
	}]) 

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post('/user/contact', {...contact})
			console.log(res);
		} catch (error) {
			return alert(error.response.data.msg)
		}
	}
	return (
		<div className='contact-page'>
			<h2>Contact</h2>

			<form onSubmit={handleSubmit}>
				<input type="text" name='name' value={contact.name}/>
				<button type="submit">Send</button>
			</form>
		</div>
	)
}

import React, {useContext, useEffect} from 'react'
import {GlobalSate} from '../../../GlobalSate'
import axios from 'axios'

export default function ListContact() {
	const state = useContext(GlobalSate)

	const [contacts, setContacts] = state.userAPI.contacts

	const [token] = state.token

	const [isAdmin] = state.userAPI.isAdmin

	useEffect(() => {
		if(token) {
			const getContact = async () => {
				if(isAdmin) {
					const res = await axios.get('/user/contacts', {
						headers: {Authorization: token}
					})
					setContacts(res.data)
					console.log(res.data)
				}
			}

			getContact()
		}
	}, [token, isAdmin, setContacts])

	document.title = 'Contacts'
	
	return (
		<div className="contact-page">
			<h2>Contacts List</h2>

			<table>
				<thead>
					<tr>
						<th></th>
						<th>Full Name</th>
						<th>Email</th>
						<th>Phone Number</th>
						<th>Description</th>
						<th>Create At</th>
					</tr>
				</thead>
				<tbody>
					{
						contacts.map(contact => (
							<tr>
								<td>{contact._id}</td>
								<td>{contact.name}</td>
								<td>{contact.email}</td>
								<td>{contact.tel}</td>
								<td>{contact.description}</td>
								<td>{new Date(contact.createdAt).toLocaleDateString()}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}

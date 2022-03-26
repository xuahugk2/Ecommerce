import React, {useContext} from 'react'
import {GlobalSate} from '../../../GlobalSate'
import {Link} from 'react-router-dom'

export default function ListContact() {
	const state = useContext(GlobalSate)

	const [contacts] = state.userAPI.contacts

	document.title = 'Contacts'
	
	return (
		<div className="contact-page">
			<h2>Contacts List</h2>

			<table>
				<thead>
					<tr>
						<th>Full Name</th>
						<th>Email</th>
						<th>Phone Number</th>
						<th>Create At</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						contacts.map(contact => (
							<tr>
								<td>{contact.name}</td>
								<td>{contact.email}</td>
								<td>{contact.tel}</td>
								<td>{new Date(contact.createdAt).toLocaleDateString()}</td>
								<td><Link id='btn_view' to={`/contacts/${contact._id}`}><i class="fa-solid fa-eye"></i></Link></td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}

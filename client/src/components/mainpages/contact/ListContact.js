import React, {useContext, useState} from 'react'
import {GlobalSate} from '../../../GlobalSate'

export default function ListContact() {
	const state = useContext(GlobalSate)

	const [contacts] = state.userAPI.contacts

	const [isOpen, setIsOpen] = useState(false)

	const [contact, setContact] = useState({})

	const openBox = (cont) => {
		setContact(cont)
		setIsOpen(true)
	}

	const closeBox = () => {
		setIsOpen(false)
	}

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
						contacts.map(cont => (
							<tr>
								<td>{cont.name}</td>
								<td>{cont.email}</td>
								<td>{cont.tel}</td>
								<td>{new Date(cont.createdAt).toLocaleDateString()}</td>
								<td><i onClick={() => openBox(cont)} className="fa-solid fa-eye"></i></td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}

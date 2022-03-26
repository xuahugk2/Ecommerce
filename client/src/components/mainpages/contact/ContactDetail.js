import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from'react-router-dom'
import {GlobalSate} from '../../../GlobalSate'

export default function ContactDetail() {
	const param = useParams()

	const state = useContext(GlobalSate)

	const token = state.token

	const [isAdmin] = state.userAPI.isAdmin

	const [contacts] = state.userAPI.contacts

	const [contact, setContact] = useState({})

	useEffect(() => {
		if(token && isAdmin) {
			contacts.forEach(item => {
				if(item._id === param.id) setContact(item)
			})
		}
	}, [token, isAdmin, contacts, param.id])

	document.title = 'Contact'

	return (
		<div>ContactDetail</div>
	)
}

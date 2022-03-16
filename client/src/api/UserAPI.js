import {useState, useEffect} from 'react'
import axios from 'axios'

export default function UserAPI(token) {
	const [isLogged, setIsLogged] = useState(false)

	const [isAdmin, setIsAdmin] = useState(false)

	useEffect(() => {
		if(token) {
			const getUser = async () => {
				try {
					const res = await axios.get('user/infor', {
						headers: {Authorization: token}
					})

					setIsLogged(true)
					res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

					console.log(res);
				} catch (error) {
					alert(error.response.data.msg)
				}
			}

			getUser()
		}
	}, [token])
	return {
		isLogged: [isLogged, setIsLogged],
		isAdmin: [isAdmin, setIsAdmin]

	}
}

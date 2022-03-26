import React, { useContext, useState } from 'react'
import { GlobalSate } from '../../GlobalSate'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Header() {
	const state = useContext(GlobalSate)

	const [isLogged, setIsLogged] = state.userAPI.isLogged
	const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
	const [cart, setCart] = state.userAPI.cart
	const [menu, setMenu] = useState(false)

	const logoutUser = async () => {
		await axios.get('/user/logout')

		localStorage.removeItem('firstLogin')

		setCart([])
		setIsAdmin(false)
		setIsLogged(false)
	}

	const adminRouter = () => {
		return (
			<React.Fragment>
				<li><Link to='/create_product'>Create Product</Link></li>
				<li><Link to='/category'>Categories</Link></li>
			</React.Fragment>
		)
	}

	const toggleMenu = () => setMenu(!menu)

	const loggedRouter = () => {
		return (
			<React.Fragment>
				<li><Link to='/history'>History</Link></li>
				<li><Link to='/' onClick={logoutUser}>Logout</Link></li>
			</React.Fragment>
		)
	}

	const styleMenu = {
		left: menu ? 0 : '-100%'
	}

	return (
		<header>
			<div className='menu' onClick={() => setMenu(!menu)}>
				<img src={Menu} alt='' width='30' />
			</div>

			<div className='logo'>
				<h1>
					<Link to='/'>{isAdmin ? 'Admin' : 'DauCatMoi'}</Link>
				</h1>
			</div>

			<ul style={styleMenu}>
				<li>{isAdmin ? <Link to='/contacts'>Contacts</Link> : <Link to='/contact'>Contact</Link>}</li>

				<li><Link to='/'>{isAdmin ? 'Products' : 'Shop'}</Link></li>

				{isAdmin && adminRouter()}
				{
					isLogged ? loggedRouter() : <li><Link to='/login'>Login</Link></li>
				}
				
				<li onClick={() => setMenu(!menu)}>
					<img src={Close} alt='' width='30' className='menu'/>
				</li>
			</ul>

			{
				isAdmin ? '' : 
					<div className='cart-icon'>
						<span>{cart.length}</span>
						<Link to='/cart'>
							<img src={Cart} alt='' width='30'/>
						</Link>
					</div>
			}			
		</header>
	)
}

import React, { useContext } from 'react'
import { GlobalSate } from '../../GlobalSate'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link } from 'react-router-dom'

export default function Header() {
	const state = useContext(GlobalSate)

	const [isLogged, setIsLogged] = state.userAPI.isLogged
	const [isAdmin, setIsAdmin] = state.userAPI.isAdmin

	const adminRouter = () => {
		return (
			<React.Fragment>
				<li><Link to='/create_product'>Create Product</Link></li>
				<li><Link to='/category'>Categories</Link></li>
			</React.Fragment>
		)
	}

	const loggedRouter = () => {
		return (
			<React.Fragment>
				<li><Link to='/history'>History</Link></li>
				<li><Link to='/'>Logout</Link></li>
			</React.Fragment>
		)
	}

	return (
		<header>
			<div className='menu'>
				<img src={Menu} alt='' width='30' />
			</div>

			<div className='logo'>
				<h1>
					<Link to='/'>{isAdmin ? 'Admin' : 'DauCatMoi'}</Link>
				</h1>
			</div>

			<ul>
				<li><Link to='/'>{isAdmin ? 'Products' : 'Shop'}</Link></li>

				{isAdmin && adminRouter()}
				{
					isLogged ? loggedRouter() : <li><Link to='/login'>Login</Link></li>
				}
				
				<li className='menu'><img src={Close} alt='' width='30' /></li>
			</ul>

			{
				isAdmin ? '' : 
					<div className='cart-icon'>
						<span>0</span>
						<Link to='/cart'>
							<img src={Cart} alt='' width='30'/>
						</Link>
					</div>
			}

			
		</header>
	)
}

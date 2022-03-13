import React, { useContext } from 'react'
import { GlobalSate } from '../../GlobalSate'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link } from 'react-router-dom'

export default function Header() {
	const value = useContext(GlobalSate)
	return (
		<header>
			<div className='menu'>
				<img src={Menu} alt='' width='30' />
			</div>

			<div className='logo'>
				<h1>
					<Link to='/'>DauCatMoi</Link>
				</h1>
			</div>

			<ul>
				<li><Link to='/'>Product</Link></li>
				<li><Link to='/login'>Login / Register</Link></li>
				<li className='menu'><img src={Close} alt='' width='30' /></li>
			</ul>

			<div className='cart-icon'>
				<span>0</span>
				<Link to='/cart'>
					<img src={Cart} alt='' width='30'/>
				</Link>
			</div>
		</header>
	)
}

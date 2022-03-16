import React, {useContext} from 'react'
import {GlobalSate} from '../../../GlobalSate'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'

export default function Products() {
	const state = useContext(GlobalSate)

	const [products] = state.productsAPI.products

	const [isAdmin] = state.userAPI.isAdmin
	
	return (
		<React.Fragment>
			<div className='products'>
				{
					products.map(product => {
						return <ProductItem 
									key={product._id}
									product={product}
									isAdmin={isAdmin}
								/>
					})
				}
			</div>
			{products.length === 0 && <Loading/>}
		</React.Fragment>
	)
}

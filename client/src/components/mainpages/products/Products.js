import React, {useContext, useEffect} from 'react'
import {GlobalSate} from '../../../GlobalSate'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'

export default function Products() {
	const state = useContext(GlobalSate)

	const [products, setProducts] = state.productsAPI.products

	const [isAdmin] = state.userAPI.isAdmin	

    useEffect(() => {
		const getProducts = async () => {
			const res = await axios.get('/api/products')
			setProducts(res.data.products)
		}

        getProducts()
    }, [setProducts])
	
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

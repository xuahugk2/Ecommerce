import React, {useContext, useState} from 'react'
import {GlobalSate} from '../../../GlobalSate'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filter from './Filter'
import LoadMore from './LoadMore'

export default function Products() {
	const state = useContext(GlobalSate)

	const [products, setProducts] = state.productsAPI.products

	const [isAdmin] = state.userAPI.isAdmin
	
	const [token] = state.token

	const [callback, setCallback] = state.productsAPI.callback

	const [loading, setLoading] = useState(false)

	const [isChecked, setIsChecked] = useState(false)

	const handleCheck = (id) => {
		products.forEach(product => {
			if(product._id === id) {
				product.checked = !product.checked
			}
		})

		setProducts([...products])
	}

	const deleteProduct = async (id, public_id) => {
		try {
			setLoading(true)
			const destroyImage = axios.post('/api/destroy', {public_id}, {
				headers: {Authorization: token}
			})

			const deleteProduct = axios.delete(`/api/products/${id}`, {
				headers: {Authorization: token}
			})

			await destroyImage
			await deleteProduct
			setLoading(false)
			setCallback(!callback)
		} catch (error) {
			alert(error.response.data.msg)
		}
	}

	const checkAll = () => {
		products.forEach(product => {
			product.checked = !isChecked
		})

		setProducts([...products])
		setIsChecked(!isChecked)
	}

	const deleteAll = async () => {
		products.forEach(product => {
			if(product.checked) {
				deleteProduct(product._id, product.images.public_id)
			}
		})
	}

	if(loading) {
		return <div><Loading/></div>
	}

	document.title = 'DauCatMoi'
	
	return (
		<React.Fragment>
			<Filter/>

			{
				isAdmin && 
					<div className='delete-all'>
						<span htmlFor='check'>Select All</span>
						<input name='check' type="checkbox" checked={isChecked} onChange={checkAll} />
						<button onClick={deleteAll}>Delete</button>
					</div>
			}

			<div className='products'>
				{
					products.map(product => {
						return <ProductItem 
									key={product._id}
									product={product}
									isAdmin={isAdmin}
									deleteProduct={deleteProduct}
									handleCheck={handleCheck}
								/>
					})
				}
			</div>

			<LoadMore/>

			{products.length === 0 && <Loading/>}
		</React.Fragment>
	)
}

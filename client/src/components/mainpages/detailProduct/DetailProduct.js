import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from'react-router-dom'
import {GlobalSate} from '../../../GlobalSate'
import ProductItem from '../utils/productItem/ProductItem'

export default function DetailProduct() {
	const params = useParams()

	const state = useContext(GlobalSate)

	const [products] = state.productsAPI.products

	const addCart = state.userAPI.addCart
	
	const [detail, setDetail] = useState([])

	useEffect(() => {
		if(params.id){
			products.forEach(product => {
				if(product._id === params.id) setDetail(product)
			});
		}
	}, [params.id, products])

	if(detail.length === 0) return null

	return (
		<React.Fragment>
			<div className='detail'>		
				<img src={detail.images.url} alt='' />
				<div className='box-detail'>
					<div className='row'>
						<h2>{detail.title}</h2>
						<h6>#id: {detail.product_id}</h6>
					</div>
					<span>$ {detail.price}</span>
					<p>{detail.description}</p>
					<p>Sold: {detail.sold}</p>
					<Link to='/cart' className='cart'
					onClick={() => addCart(detail)}>
						Buy Now
					</Link>
				</div>
			</div>

			<div>
				<h2>Related products</h2>
				<div className='products'>
					{
						products.map(product => {
							return (product.category === detail.category && product._id !== params.id)
								? <ProductItem key={product._id} product={product}/>
								: null
						})
					}
				</div>
			</div>
		</React.Fragment>
  	)
}

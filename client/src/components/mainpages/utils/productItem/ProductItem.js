import React from 'react'
import {Link} from 'react-router-dom'

export default function ProductItem({product}) {
	return (
		<div className='product_card'>
			<img
				src={product.images.url}
				alt=''
				title={product.title}
			/>

			<div className='product_box'>
				<h2 title={product.title}>{product.title}</h2>
				<span>$ {product.price}</span>
				<p>{product.description}</p>
			</div>

			<div className='row_btn'>
				<Link id='btn_buy' to='#!'>
					Buy
				</Link>
				<Link id='btn_view' to={`/detail/${product._id}`}>
					Detail
				</Link>
			</div>
		</div>
	)
}

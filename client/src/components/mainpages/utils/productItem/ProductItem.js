import React from 'react'
import BtnRender from './BtnRender'

export default function ProductItem({product, isAdmin}) {
	return (
		<div className='product_card'>
			{
				isAdmin && <input type="checkbox" checked={product.checked} name="" id="" />
			}

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

			<BtnRender product={product}/>
		</div>
	)
}

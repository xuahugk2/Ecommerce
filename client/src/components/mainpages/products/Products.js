import React, {useContext} from 'react'
import {GlobalSate} from '../../../GlobalSate'
import ProductItem from '../utils/productItem/ProductItem'

export default function Products() {
  const state = useContext(GlobalSate)

  const [products] = state.productsAPI.products
  
  return (
	  <div className='products'>
      {
        products.map(product => {
          return <ProductItem key={product._id} product={product}/>
        })
      }
    </div>
  )
}

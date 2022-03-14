import React, {useContext} from 'react'
import {GlobalSate} from '../../../GlobalSate'

export default function Products() {
  const state = useContext(GlobalSate)

  const [products] = state.ProductAPI.products

  console.log(products);

  return (
	<div>{products}</div>
  )
}

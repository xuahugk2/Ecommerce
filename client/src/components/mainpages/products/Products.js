import React, {useContext} from 'react'
import {GlobalSate} from '../../../GlobalSate'

export default function Products() {
  const state = useContext(GlobalSate)

  const [products] = state.productAPI.products

  console.log({msg: products});

  return (
	  <div>Trang products</div>
  )
}

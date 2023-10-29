import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalSate } from '../../../../GlobalSate'

export default function BtnRender({ product, deleteProduct }) {
    const state = useContext(GlobalSate)

    const [isAdmin] = state.userAPI.isAdmin

    const addCart = state.userAPI.addCart

    return (
        <div className='row_btn'>
            {
                isAdmin ?
                    <React.Fragment>
                        <Link id='btn_delete' to='#!' onClick={() => deleteProduct(product._id, product.images.public_id)}>
                            Delete
                        </Link>
                        <Link id='btn_edit' to={`/edit_product/${product._id}`}>
                            Edit
                        </Link>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        {
                            (product.quantity > 0) ? <Link id='btn_buy' to='#!' onClick={() => addCart(product)}>Buy</Link> : <Link id='btn-sold_out' to='#!'>Sold out</Link>
                        }
                        <Link id='btn_view' to={`/detail/${product._id}`}>
                            Detail
                        </Link>
                    </React.Fragment>
            }
        </div>
    )
}

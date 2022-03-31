import React, {useContext} from 'react'
import {GlobalSate} from '../../../GlobalSate'

export default function LoadMore() {
	const state = useContext(GlobalSate)

	const [page, setPage] = state.productsAPI.page

	const [result] = state.productsAPI.result

	return (
		<div className='load_more'>
			{
				result < page * 6
					? '' 
					: <button onClick={() => setPage(page + 1)}>Load More</button>
			}
		</div>
	)
}

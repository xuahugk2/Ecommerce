import React, {useContext} from 'react'
import {GlobalSate} from '../../../GlobalSate'

export default function Filter() {
	const state = useContext(GlobalSate)

	const [categories] = state.categoriesAPI.categories

	const [category, setCategory] = state.productsAPI.category

    const [sort, setSort] = state.productsAPI.sort
    
    const [search, setSearch] = state.productsAPI.search

	const handleCategory = (e) => {
		setCategory(e.target.value)
		setSearch('')
	}

	return (
		<div className='filter_menu'>
			<div className="row">
				<span>Filter: </span>
				<select name="category" value={category} onChange={handleCategory}>
					<option value="">All Products</option>
					{
						categories.map(item => (
							<option value={'category=' + item._id} key={item._id}>
								{item.name}
							</option>
						))
					}
				</select>
			</div>

			<input type="text" value={search} 
				placeholder='Search something...' 
				onChange={(e) => setSearch(e.target.value.toLowerCase())}
			/>

			<div className="row sort">
				<span>Sort By: </span>
				<select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
					<option value="">Newest</option>
					<option value="sort=createdAt">Oldest</option>
					<option value="sort=-sold">Best sales</option>
					<option value="sort=-price">Price: High-Low</option>
					<option value="sort=price">Price: Low-High</option>
				</select>
			</div>
		</div>
	)
}

import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalSate} from '../../../GlobalSate'
import Loading from '../utils/loading/Loading'
import {useNavigate, useParams} from 'react-router-dom'

const initialProduct = {
	product_id: 'pro',
	title: 'product ',
	price: 0,
	description: 'This is an example description',
	content: 'This is an example content',
	category: '',
	_id: ''
}

export default function CreateProduct() {
	const state = useContext(GlobalSate)

	const [product, setProduct] = useState(initialProduct)

	const [products] = state.productsAPI.products

	const [callback, setCallback] = state.productsAPI.callback

	const [categories] = state.categoriesAPI.categories

	const [images, setImages] = useState(false)

	const [loading, setLoading] = useState(false)

	const [onEdit, setOnEdit] = useState(false)

	const [isAdmin] = state.userAPI.isAdmin

	const [token] = state.token

	const history = useNavigate()

	const param = useParams()

	useEffect(() => {
		if(param.id) {
			document.title = 'Update Product'
			setOnEdit(true)
			products.forEach(item => {
				if(item._id === param.id) {
					setProduct(item)
					setImages(item.images)
				}
			})
		} else {
			document.title = 'Create Product'
			setOnEdit(false)
			setProduct(initialProduct)
			setImages(false)
		}
	}, [param.id, products])

	const handleUpload = async (e) => {
		e.preventDefault()

		try {
			if(isAdmin) {
				const file = e.target.files[0]

				if(!file) {
					return alert('File not exists.')
				}

				if(file.size > 1024 * 1024) {
					return alert('Size too large.')
				}

				if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
					return alert('File format is incorrect.')
				}

				let formData = new FormData()
				formData.append('file', file)

				setLoading(true)
				const res = await axios.post('/api/upload', formData, {
					headers: {'content-type': 'multipart/form-data', Authorization: token}
				})

				setLoading(false)
				setImages(res.data);

			} else {
				alert("You're not an admin.")
			}
		} catch (error) {
			alert(error.response.data.msg)
		}
	}

	const handleDestroy = async () => {
		try {
			if(isAdmin) {
				setLoading(true)

				await axios.post('/api/destroy', {public_id: images.public_id}, {
					headers: {Authorization: token}
				})

				setImages(false)
				setLoading(false)
			} else {
				alert("You're not an admin.")
			}
		} catch (error) {
			alert(error.response.data.msg)
		}
	}

	const handleChangeInput = (e) => {
		const {name, value} = e.target

		setProduct({...product, [name]:value})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			if(isAdmin) {
				if(!images) {
					return alert('No image is uploaded')
				}

				if(onEdit) {
					const res = await axios.put(`/api/products/${product._id}`, {...product, images}, {
						headers: {Authorization: token}
					})
					alert(res.data.msg)
				} else {
					const res = await axios.post('/api/products', {...product, images}, {
						headers: {Authorization: token}
					})
					alert(res.data.msg)
				}

				setCallback(!callback)
				history.push('/')				
			} else {
				alert("You're not an admin.")
			}
		} catch (error) {
			alert(error.response.data.msg)
		}
	}

	const styleUpload = {
		display: images ? 'block' : 'none'
	}

	return (
		<div className='create-product'>
			<div className="upload">
				<input type="file" name="file" id="file_up" 
					onChange={handleUpload}/>
				{
					loading 
						?	<div id="file_img" style={styleUpload}>
								<Loading />
							</div>
						:	<div id="file_img" style={styleUpload}>
								<img src={images ? images.url : ''} alt="" />
								<span onClick={handleDestroy}>X</span>
							</div>
				}
				
			</div>

			<form onSubmit={handleSubmit}>
				<div className="row">
					<label htmlFor="product_id">Product ID</label>
					<input type="text" name='product_id' id='product_id' required disabled={onEdit}
						value={product.product_id} 
						onChange={handleChangeInput}/>
				</div>

				<div className="row">
					<label htmlFor="title">Title</label>
					<input type="text" name='title' id='title' required 
						value={product.title} 
						onChange={handleChangeInput} />
				</div>
				
				<div className="row">
					<label htmlFor="price">Price</label>
					<input type="number" name='price' id='price' required 
						value={product.price} 
						onChange={handleChangeInput} />
				</div>
				
				<div className="row">
					<label htmlFor="description">Description</label>
					<textarea type="text" name='description' id='description' required 
						value={product.description} rows='5' 
						onChange={handleChangeInput} />
				</div>

				<div className="row">
					<label htmlFor="content">Content</label>
					<textarea type="text" name='content' id='content' required 
						value={product.content} rows='7' 
						onChange={handleChangeInput} />
				</div>
				
				<div className="row">
					<label htmlFor="categories">Categories</label>
					<select name='category' value={product.category} onChange={handleChangeInput}>
						<option value="">Please select a category</option>
						{
							categories.map(item => (
								<option value={item._id} key={item._id}>
									{item.name}
								</option>
							))
						}
					</select>
				</div>

				<button type='submit'>{onEdit ? 'Update' : 'Create'}</button>
			</form>
		</div>
	)
}

import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function ProductAPI() {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const res = await axios.get('/api/products')
        setProducts(res)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return {
        products: [products, setProducts]
    }
}

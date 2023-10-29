import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="wrapper">
            <h1>404 | Not Found</h1>
            <Link to='/'><i className="fa-solid fa-arrow-left"></i>Back to Home page</Link>
        </div>
    )
}

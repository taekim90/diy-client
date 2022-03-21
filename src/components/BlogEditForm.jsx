import { useState } from 'react'
import axios from 'axios'
import Form from './Form'

export default function BlogEditForm({ blog, setShowForm, showForm }) {

    const [blogForm, setBlogForm] = useState(blog)

    const handleSubmit = e => {
        e.preventDefault()
        // axios.method(url, request body, options)
        axios.put(`${process.env.REACT_APP_SERVER_URL}/blog/${blog._id}`, blogForm)
            .then(response => {
                console.log(response.data)
                setShowForm(!showForm)
            })
            .catch(console.log)
    }

    return (
        <>
            <h1>Edit The Blog</h1>

            <Form 
                blogForm={blogForm}
                setBlogForm={setBlogForm}
                handleSubmit={handleSubmit}
            />
        </>
    )
}
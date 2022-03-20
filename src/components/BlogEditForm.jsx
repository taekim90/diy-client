import { useState } from 'react'
import axios from 'axios'
import Form from './Form'

export default function BlogEditForm({ matchedBlog, setShowForm, showForm }) {

    const [blogForm, setBlogForm] = useState(matchedBlog)

    const handleSubmit = e => {
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_SERVER_URL}/blog/${matchedBlog._id}`, blogForm)
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
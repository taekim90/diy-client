import { useState } from 'react'
import axios from "axios"
import Form from "../Form"

export default function Blogs({ blogs, setBlogs}) {

    const [formData, setFormData] = useState({
        name: "",
        title: "",
        content: ""
    })

    const handleSubmit = e => {
        e.preventDefault()
        // axios.method(url, request body, options)
        axios.post(`${process.env.REACT_APP_SERVER_URL}/blog`, formData)
            .then(response => {
                setFormData({
                    name: "",
                    title: "",
                    content: ""
                })
                // if you return a promise from a .then -- you can .then again!
                // this is called promise chaining!
                // can comment this out and put in blogs into the dependency of app
                return axios.get(process.env.REACT_APP_SERVER_URL + '/blog')
            })
            .then(response => setBlogs(response.data)) // this is changing the parent state, which causes the re-render
            .catch(console.log)
    }

    return (
        <>
            <h1>Blogs Page</h1>
            {blogs}

            <h1>Create New Blog</h1>
            <Form 
                blogForm={formData}
                setBlogForm={setFormData}
                handleSubmit={handleSubmit}
            />
        </>
    )
}
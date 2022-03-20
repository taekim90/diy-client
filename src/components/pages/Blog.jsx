import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound'
import BlogDetails from '../BlogDetails'
import BlogEditForm from '../BlogEditForm'

export default function Blog({ blogs }) {
    const { id } = useParams()
    const [blog, setBlog] = useState({})
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`)
            .then(response => {
                setBlog(response.data)
                // return axios.get(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`)
            })
            .catch(console.log)
    }, [showForm])

    const matchedBlog = blogs.find(blog => blog._id === id)
    if (!matchedBlog) return <NotFound />
    

    return (
        <>
            { 
                showForm ? 
                    <BlogEditForm matchedBlog={matchedBlog} setShowForm={setShowForm} showForm={showForm}/> :
                    <BlogDetails matchedBlog={matchedBlog}/>
            }
            
            <button
                onClick={() => setShowForm(!showForm)}
            > 
                {showForm ? 'exit' : 'edit'}
            </button>

            <div>
                <Link to="/blogs">Back To All Blogs</Link>
            </div>
        </>
    )
}
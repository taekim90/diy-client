import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BlogDetails from '../BlogDetails'
import BlogEditForm from '../BlogEditForm'

export default function Blog({ blogs, setBlogs, comments, setComments }) {
    const { id } = useParams()
    const [blog, setBlog] = useState({})
    const [showForm, setShowForm] = useState(false)
    // const [comments, setComments] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`)
            .then(response => {
                setBlog(response.data)
                setComments(response.data.comments)
                return axios.get(process.env.REACT_APP_SERVER_URL + '/blog')
            })
            .then(response => setBlogs(response.data)) // this is changing the parent state, which causes the re-render
            .catch(console.log)
            // console.log('CONSOLE LOGGING BLOG:', blog)
    }, [showForm])

    // const matchedBlog = blogs.find(blog => blog._id === id)
    // if (!matchedBlog) return <NotFound />

    const handleSubmit = (e) => {
        e.preventDefault()
        // axios.method(url, request body, options)
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/blog/${blog._id}`, blog)
            .then(response => {
                console.log(response.data)
                setBlog({})
                return axios.get(process.env.REACT_APP_SERVER_URL + '/blog')
            })
            .then(response => setBlogs(response.data)) 
            .catch(console.log)
    }
    
    return (
        <>
            { 
                showForm ? 
                    <BlogEditForm blog={blog} setShowForm={setShowForm} showForm={showForm}/> :
                    <BlogDetails blog={blog} blogs={blogs} comments={comments}/>
            }
            
            <button
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'exit' : 'edit the blog'}
            </button>

            <button
                onClick={handleSubmit}
            >
                Delete This Blog
            </button>

            <div>
                <Link to={`/blogs/${id}/comment`}>Add Comments</Link>
            </div>

            <div>
                <Link to="/blogs">Back To All Blogs</Link>
            </div>
        </>
    )
}
import axios from "axios"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"


export default function Comment({ blogs, setBlogs }) {

    const { id } = useParams()

    const [commentForm, setCommentForm] = useState({})

    const handleSubmit = e => {
        e.preventDefault()
        // axios.method(url, request body, options)
        axios.post(`${process.env.REACT_APP_SERVER_URL}/blog/${id}/comment`, commentForm)
            .then(response => {
                setCommentForm({
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
            <h1>Add A Comment</h1>

            <form onSubmit={handleSubmit}>  
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <input type="text" 
                    value={commentForm.content}
                    onChange={e => setCommentForm({ ...commentForm, content: e.target.value })}
                    id="comment"
                    />
                </div>
                <input type="submit" />
            </form>

            <div>
                <Link to={`/blogs/${id}`}>Back To Blog</Link>
            </div>
        </>
    )
}
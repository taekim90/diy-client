import axios from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"


export default function EditComment({ blogs, setBlogs, comments, setComments }) {
    
    console.log(comments)
    const { id } = useParams()

    const foundComment = comments.find(comment => {
        return comment._id === id
    })
    console.log(foundComment)

    const [commentForm, setCommentForm] = useState(foundComment)


    const handleChanges = e => {
        e.preventDefault()
        // axios.method(url, request body, options)
        axios.put(`${process.env.REACT_APP_SERVER_URL}/comment/${id}`, commentForm)
            .then(response => {
                setComments(comments)
                return axios.get(process.env.REACT_APP_SERVER_URL + '/blog')
            })
            .then(response => setBlogs(response.data)) 
            .catch(console.log)
    }

    const handleDelete = e => {
        e.preventDefault()
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/comment/${id}`, commentForm)
            .then(response => {
                console.log(response.data)
                setCommentForm({})
                return axios.get(process.env.REACT_APP_SERVER_URL + '/blog')

            })
            .then(response => setBlogs(response.data)) 
            .catch(console.log)
    }


    return (
        <>
            <h1>Edit This Comment</h1>

            <form onSubmit={handleChanges}>  
                <div>
                    <label htmlFor="content">Content:</label>
                    <input type="text" 
                    value={commentForm.content}
                    onChange={e => setCommentForm({ ...commentForm, content: e.target.value })}
                    id="content"
                    />
                </div>
                <input type="submit" value="Update Comment"/>
            </form>

            <button
                onClick={handleDelete}
            >
                Delete This Comment
            </button>


            <div>
                <Link to={`/blogs`}>Back To Blogs</Link>
            </div>
        </>
    )
}
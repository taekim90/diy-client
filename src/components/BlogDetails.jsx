import { Link } from "react-router-dom"

export default function BlogDetails({ blog, blogs, comments }) {
        
    const comment = comments.map((comment, index) => {
        return (
            <div key={`comment-key${index}`}>
                <Link to={`/comment/${comment._id}`}>{comment.content}</Link>
            </div>
        )
    })

    return (
        <>
            <div>
                <h1>{blog.title}</h1>
                <h3>{blog.name}</h3>
                <p>{blog.content}</p>
                <h4>Comments:</h4>
                <p>{comment}</p>
            </div>
        </>
    )
}
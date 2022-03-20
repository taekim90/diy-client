import { Link } from "react-router-dom"

export default function Blogs({ blogs, setBlogs}) {

    const blogsLinks = blogs.map((blog, index) => {
        return (
            <div key={`blog-link${index}`}>
                <h1><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></h1>
                {/* <h1>{blog.title}</h1> */}
                <h3>By:{blog.name}</h3>
                <p>{blog.content}</p>
            </div>
        )
    })

    return (
        <>
            <h1>Blogs Page</h1>
            {blogsLinks}
        </>
    )
}
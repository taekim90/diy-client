export default function BlogDetails({ matchedBlog }) {
    return (
        <>
            <div>
                <h1>{matchedBlog.title}</h1>
                <h3>{matchedBlog.name}</h3>
                <p>{matchedBlog.content}</p>
            </div>
        </>
    )
}
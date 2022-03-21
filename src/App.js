import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Home from './components/pages/Home.jsx'
import Blogs from './components/pages/Blogs.jsx'
import Blog from './components/pages/Blog.jsx'
import Comment from './components/pages/Comment';
import EditComment from './components/EditComment';
import { Link } from 'react-router-dom';


function App() {

  // state to hold the blogs
  const [blogs, setBlogs] = useState([])

  // state to hold all comments?
  const [comments, setComments] = useState([])


  // useEffect to get all the blogs
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + '/blog')
      .then(response => {
        setBlogs(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const blogsLinks = blogs.map((blog, index) => {
    return (
        <div key={`blog-key${index}`}>
            <h1><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></h1>
            {/* <h1>{blog.title}</h1> */}
            <h3>By:{blog.name}</h3>
            <p>{blog.content}</p>
            <p>COMMENTS:</p>
            <h5>{blog.comments.map((comment) => {
              return (
                <p>{comment.content}</p>
              )
            })}</h5>
        </div>
    )
  })

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route 
            path='/' 
            element={<Home />}
          /> 
          <Route 
            exact path='/blogs'
            element={<Blogs blogs={blogsLinks} setBlogs={setBlogs} />}
          />
          <Route 
            exact path='/blogs/:id'
            element={<Blog blogs={blogsLinks} setBlogs={setBlogs} comments={comments} setComments={setComments}/>}
          />
          <Route 
            path='/blogs/:id/comment'
            element={<Comment blogs={blogsLinks} setBlogs={setBlogs} />}
          />
          <Route 
            path='/comment/:id'
            element={<EditComment blogs={blogsLinks} setBlogs={setBlogs} comments={comments} setComments={setComments}/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

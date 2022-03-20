import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Home from './components/pages/Home.jsx'
import Blogs from './components/pages/Blogs.jsx'
import Blog from './components/pages/Blog.jsx'


function App() {
  // state to hold the blogs
  const [blogs, setBlogs] = useState([])
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
            element={<Blogs blogs={blogs} setBlogs={setBlogs}/>}
          />
          <Route 
            path='/blogs/:id'
            element={<Blog blogs={blogs} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

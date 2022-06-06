import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (data, type='error') => {
    setErrorMessage({ data, type })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const clearTextBoxes = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    clearTextBoxes()
    window.localStorage.clear()
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      clearTextBoxes()
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? 
        <LoginForm handleLogin={handleLogin} username={username} 
          setUsername={setUsername} password={password} setPassword={setPassword} /> : 
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
        <BlogForm addBlog={addBlog} newTitle={newTitle} setNewTitle={setNewTitle} 
          newAuthor={newAuthor} setNewAuthor={setNewAuthor} newUrl={newUrl} 
          setNewUrl={setNewUrl} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
    </div>
  )
}

export default App

import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    window.localStorage.clear()
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
    blogFormRef.current.toggleVisibility()
  }

  const blogFormRef = useRef()

  const updateBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const sortBlogsByLikes = blogs.sort((a, b) => b.likes - a.likes)

  const deleteBlog = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const choice = window.confirm(`Remove ${blogToRemove.title} by ${blogToRemove.author}`)
    try {
      if (choice) {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        notify(`successfully deleted ${blogToRemove.title} by ${blogToRemove.author}`, 'success')
      }
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        <LoginForm handleLogin={handleLogin} username={username}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          password={password} handlePasswordChange={({ target }) =>
            setPassword(target.value)} /> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {sortBlogsByLikes.map(blog =>
            <Blog key={blog.id} blog={blog}
              updateLikes={updateBlog}
              deleteBlog={deleteBlog} loggedInUser={user} />
          )}
        </div>
      }
    </div>
  )
}

export default App

import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            id='title-input'
            placeholder='enter title here'
          />
        </div>
        <div>
          author:
          <input
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            id='author-input'
            placeholder='enter author here'
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            id='url-input'
            placeholder='enter url here'
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
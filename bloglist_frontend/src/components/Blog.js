import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, loggedInUser }) => {
  const [details, setDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showCompleteInfo = () => setDetails(!details)

  const showDelBtn = (blog, loggedInUser) =>
    blog.user && blog.user.username === loggedInUser.username ? true : false

  return (
    <div className='blog'>
      {details === false ? <div style={blogStyle}>
        {blog.title} {blog.author} <button id='viewButton' onClick={showCompleteInfo}>view</button> </div>
        :
        <div>
          <div style={blogStyle}>
            {blog.title} {blog.author} <button onClick={showCompleteInfo}>hide</button> <br />
            <a href={blog.url}>{blog.url}</a> <br />
          likes {blog.likes}<button id='likeButton' onClick={() => updateLikes(blog.id)}>like</button> <br />
            {blog.user && blog.user.name ? blog.user.name : 'unknown'} <br />
            {showDelBtn(blog, loggedInUser) && <button id='deleteButton' onClick={() => deleteBlog(blog.id)}>delete</button>}
          </div>
        </div>
      }
    </div>
  )
}

export default Blog
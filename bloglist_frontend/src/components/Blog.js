import { useState } from "react"

const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showCompleteInfo = () => {
    setDetails(!details)
  }
  
  return (
    <div>
      {details === false ? <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={showCompleteInfo}>view</button> </div> :
      <div style={blogStyle}> 
      {blog.title} {blog.author} <button onClick={showCompleteInfo}>hide</button> <br />
      {blog.url} <br />
      likes {blog.likes}<button>like</button> <br />
      {blog.user.name} </div>}
    </div>
  )
}
  
export default Blog
const BlogForm = ({ addBlog, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl }) => (
    <form onSubmit={addBlog}>
      <div>
        <h2>create new</h2>
        title: 
            <input 
            type="text" 
            value={newTitle} 
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)} 
            />
      </div>
      <div>
        author: 
            <input 
            type="text" 
            value={newAuthor} 
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)} 
            />
      </div>
      <div>
        url: 
            <input 
            type="url" 
            value={newUrl} 
            name="Url"
            onChange={({target}) => setNewUrl(target.value)} 
            />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )

  export default BlogForm
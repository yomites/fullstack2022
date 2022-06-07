const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
    <form onSubmit={handleLogin}>
      <div>
      <h2>log in to the application</h2>
        username
          <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
export default LoginForm  
const LoginForm = ({ handleLogin, username, handleUsernameChange,
  password, handlePasswordChange }) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>log in to the application</h2>
        username
      <input
        value={username}
        onChange={handleUsernameChange}
      />
    </div>
    <div>
        password
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm
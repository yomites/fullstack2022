const LoginForm = ({ handleLogin, username, handleUsernameChange,
  password, handlePasswordChange }) => (
  <form id="login-form" onSubmit={handleLogin}>
    <div id="username-div">
      <h2>log in to the application</h2>
        username
      <input
        id="username-input"
        value={username}
        onChange={handleUsernameChange}
      />
    </div>
    <div id="password-div">
        password
      <input
        id="password-input"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
    </div>
    <button id="loginButton" type="submit">login</button>
  </form>
)

export default LoginForm
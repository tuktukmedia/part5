import PropTypes from 'prop-types'

const loginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => (
  <form onSubmit={handleLogin}>
    username
    <input
      value={username}
      type='text'
      name='Username'
      onChange={({ target }) => setUsername(target.value)}
    />
    <br />
    password
    <input
      value={password}
      type='password'
      name='password'
      onChange={({ target }) => setPassword(target.value)}
    />
    <br />
    <button type='submit'>login</button>
  </form>
)

loginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default loginForm

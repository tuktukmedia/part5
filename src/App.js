import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setPassword('')
      setUsername('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 4000)
    }
  }

  const handleLogout = async event => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
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
      <p>{errorMessage}</p>
    </form>
  )

  const blogList = () => blogs.map(blog => <Blog key={blog.id} blog={blog} />)

  return (
    <div>
      {user !== null ? (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          {blogList()}
        </div>
      ) : (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      )}
    </div>
  )
}

export default App

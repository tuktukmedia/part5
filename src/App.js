import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)

      setPassword('')
      setUsername('')
    } catch (exception) {
      notify('Wrong username or password', 'alert')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogList = () => {
    let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    return sortedBlogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        blogs={blogs}
        setBlogs={setBlogs}
        notify={notify}
        user={user}
        handleLike={handleLike}
      />
    ))
  }
  const handleLike = async blog => {
    const newLikes = blog.likes + 1

    const updateBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
      user: blog.user.id
    }
    try {
      const updateLikes = await blogService.update(blog.id, updateBlog)

      const updateBlogs = blogs.map(blog =>
        blog.id === updateLikes.id ? updateLikes : blog
      )
      setBlogs(updateBlogs)
    } catch (exception) {
      notify('something went wrong with likes', 'alert')
    }
  }

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }
  const handleCreate = async newBlog => {
    try {
      const createBlog = await blogService.create(newBlog)
      console.log('🚀 ~ handleCreate ~ createBlog', createBlog)

      setBlogs(blogs.concat(createBlog))
      notify(
        `a new blog ${createBlog.title} by ${createBlog.author} added`,
        'info'
      )
    } catch (exception) {
      notify('Problem creating blog', 'alert')
    }
  }
  return (
    <div>
      {user !== null ? (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <CreateForm handleCreate={handleCreate} />
          {blogList()}
        </div>
      ) : (
        <div>
          <h2>Log in to application</h2>
          <Notification notification={notification} />

          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            setPassword={setPassword}
            setUsername={setUsername}
          />
        </div>
      )}
    </div>
  )
}

export default App

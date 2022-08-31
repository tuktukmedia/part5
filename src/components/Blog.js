import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, notify, blogs, setBlogs, user }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const blogStyle = {
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    border: user.id === blog.user.id ? 'solid' : 'dotted'
  }

  const buttonStyle = {
    marginLeft: 10
  }

  const handleLike = async event => {
    event.preventDefault()
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

  const handleRemove = async event => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)

        const updateBlogs = blogs.filter(x => x.id !== blog.id)

        setBlogs(updateBlogs)
      } catch (exception) {
        notify('something went wrong with removal', 'alert')
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        {viewDetails ? (
          <button style={buttonStyle} onClick={() => setViewDetails(false)}>
            hide
          </button>
        ) : (
          <button style={buttonStyle} onClick={() => setViewDetails(true)}>
            view
          </button>
        )}
      </div>
      {viewDetails === true ? (
        <div>
          {blog.url}
          <br />
          likes {blog.likes} <button onClick={handleLike}>like</button>
          <br />
          {blog.user.name}
          <br />
          {blog.user.id === user.id ? (
            <button onClick={handleRemove}>remove</button>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

Blog.propTypes = {
  notify: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog

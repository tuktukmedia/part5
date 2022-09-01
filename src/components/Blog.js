import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, notify, blogs, setBlogs, user, handleLike }) => {
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

  const handleView = event => {
    event.preventDefault()
    setViewDetails(!viewDetails)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} - {blog.author}
        {viewDetails ? (
          <button style={buttonStyle} onClick={handleView} id='hide-button'>
            hide
          </button>
        ) : (
          <button style={buttonStyle} onClick={handleView} id='view-button'>
            view
          </button>
        )}
      </div>
      {viewDetails === true ? (
        <div>
          {blog.url}
          <br />
          likes {blog.likes}{' '}
          <button onClick={() => handleLike(blog)} id='like-button'>
            like
          </button>
          <br />
          {blog.user.name}
          <br />
          {blog.user.id === user.id ? (
            <button onClick={handleRemove} id='remove-button'>
              remove
            </button>
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

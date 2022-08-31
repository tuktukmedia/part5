import { useState } from 'react'

const CreateForm = ({ blogService, blogs, setBlogs, notify }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleCreate = async event => {
    event.preventDefault()

    try {
      const newBlog = { title: title, author: author, url: url }
      const createBlog = await blogService.create(newBlog)
      console.log('🚀 ~ handleCreate ~ createBlog', createBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(createBlog))
      setVisible(false)
      notify(
        `a new blog ${createBlog.title} by ${createBlog.author} added`,
        'info'
      )
    } catch (exception) {
      notify('Problem creating blog', 'alert')
    }
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          <h2>create new</h2>
          <form onSubmit={handleCreate}>
            title
            <input
              type='text'
              value={title}
              name='title'
              onChange={({ target }) => setTitle(target.value)}
            />
            <br />
            author
            <input
              type='text'
              value={author}
              name='author'
              onChange={({ target }) => setAuthor(target.value)}
            />
            <br />
            url
            <input
              type='text'
              value={url}
              name='url'
              onChange={({ target }) => setUrl(target.value)}
            />
            <br />
            <button type='submit'>create</button>
          </form>
        </div>
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </>
  )
}

export default CreateForm

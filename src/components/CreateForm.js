import { useState } from 'react'

const CreateForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleSubmit = async event => {
    event.preventDefault()
    const newBlog = { title: title, author: author, url: url }
    handleCreate(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
    setVisible(false)
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)} id='newBlog'>
          new blog
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>
          <h2>create new</h2>
          <form onSubmit={handleSubmit}>
            title
            <input
              type='text'
              value={title}
              name='title'
              id='title'
              onChange={({ target }) => setTitle(target.value)}
            />
            <br />
            author
            <input
              type='text'
              value={author}
              name='author'
              id='author'
              onChange={({ target }) => setAuthor(target.value)}
            />
            <br />
            url
            <input
              type='text'
              value={url}
              name='url'
              id='url'
              onChange={({ target }) => setUrl(target.value)}
            />
            <br />
            <button type='submit' id='create-button'>
              create
            </button>
          </form>
        </div>
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </>
  )
}

export default CreateForm

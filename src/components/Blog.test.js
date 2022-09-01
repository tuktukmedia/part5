import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog tests', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Mr Coder',
      likes: 7,
      url: 'https://www.sometesturl.fi',
      user: {
        username: 'admin',
        name: 'Nimi niminen',
        id: '630c67a15b37b79d4d5e58ad'
      }
    }
    const user = {
      username: 'testi',
      name: 'testi käyttäjä',
      blogs: [],
      id: '630c8f4c580dd46c1bf59520'
    }

    container = render(<Blog blog={blog} user={user} />).container
  })

  test('renders content', () => {
    screen.debug()

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent('Mr Coder')
    expect(div).not.toHaveTextContent('likes')
    expect(div).not.toHaveTextContent('https://www.sometesturl.fi')
  })
  test('after clicking the button, likes and url are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    screen.debug()

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent('Mr Coder')
    expect(div).toHaveTextContent('likes')
    expect(div).toHaveTextContent('https://www.sometesturl.fi')
  })
})
test('clicking the like button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Mr Coder',
    likes: 7,
    url: 'https://www.sometesturl.fi',
    user: {
      username: 'admin',
      name: 'Nimi niminen',
      id: '630c67a15b37b79d4d5e58ad'
    }
  }
  const user = {
    username: 'testi',
    name: 'testi käyttäjä',
    blogs: [],
    id: '630c8f4c580dd46c1bf59520'
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} handleLike={mockHandler} />)

  const testuser = userEvent.setup()
  const viewButton = screen.getByText('view')
  await testuser.click(viewButton)

  const likeButton = screen.getByText('like')
  await testuser.click(likeButton)
  await testuser.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

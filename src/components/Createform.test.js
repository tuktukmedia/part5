import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'

test('correct data sent to eventhandler', async () => {
  const mockHandler = jest.fn()

  const { container } = render(<CreateForm handleCreate={mockHandler} />)

  const testuser = userEvent.setup()
  const newButton = screen.getByText('new blog')
  await testuser.click(newButton)

  const inputT = container.querySelector('#title')
  const inputA = container.querySelector('#author')
  const inputU = container.querySelector('#url')

  await userEvent.type(inputT, 'Otsikko')
  await userEvent.type(inputA, 'Etunimi Sukunimi')
  await userEvent.type(inputU, 'www.osoite.fi')

  const createButton = screen.getByText('create')
  await testuser.click(createButton)

  console.log('***** MOCK', mockHandler.mock.lastCall[0])
  expect(mockHandler.mock.lastCall[0].title).toEqual('Otsikko')
  expect(mockHandler.mock.lastCall[0].author).toEqual('Etunimi Sukunimi')
  expect(mockHandler.mock.lastCall[0].url).toEqual('www.osoite.fi')
})

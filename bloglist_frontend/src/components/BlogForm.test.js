import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('when blog is created, callback has correct data', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()
  const { container } = render(<BlogForm createBlog={createBlog} />)

  const newBlog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Brian Taylor',
    url: 'http://www.briantaylor.com',
    likes: 2
  }

  const title = container.querySelector('#title-input')
  const author = container.querySelector('#author-input')
  const url = container.querySelector('#url-input')
  const createButton = screen.getByText('create')

  await user.type(title, newBlog.title)
  await user.type(author, newBlog.author)
  await user.type(url, newBlog.url)
  await user.click(createButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
  expect(createBlog.mock.calls[0][0].author).toBe('Brian Taylor')
  expect(createBlog.mock.calls[0][0].url).toBe('http://www.briantaylor.com')
})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('blog', () => {

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Brian Taylor',
      url: 'http://www.briantaylor.com',
      likes: 2
    }
    render(<Blog blog={blog} />)
  })

  test('renders in the beginning only blog title and author', () => {
    const title = screen.getByText('Component testing is done with react-testing-library',  { exact: false })
    expect(title).toBeDefined()

    const author = screen.getByText('Brian Taylor', { exact: false })
    expect(author).toBeDefined()

    const url = screen.queryByText('http://www.briantaylor.com')
    expect(url).toBeNull()

    const likes = screen.queryByText('2 likes')
    expect(likes).toBeNull()
  })
})
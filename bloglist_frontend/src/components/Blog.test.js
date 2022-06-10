import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog', () => {
  let likeClick = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Brian Taylor',
      url: 'http://www.briantaylor.com',
      likes: 2
    }
    render(<Blog blog={blog} updateLikes={likeClick} />)
  })

  test('renders in the beginning only blog title and author', () => {
    const title = screen.getByText('Component testing is done with react-testing-library',  { exact: false })
    expect(title).toBeDefined()

    const author = screen.getByText('Brian Taylor', { exact: false })
    expect(author).toBeDefined()

    const url = screen.queryByText('http://www.briantaylor.com')
    expect(url).toBeNull()

    const likes = screen.queryByText('likes 2')
    expect(likes).toBeNull()
  })

  test('when view button clicked, test that url and likes are rendered', () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    user.click(viewButton)

    const title = screen.getByText('Component testing is done with react-testing-library',  { exact: false })
    expect(title).toBeDefined()

    const author = screen.getByText('Brian Taylor', { exact: false })
    expect(author).toBeDefined()

    const url = screen.queryByText('http://www.briantaylor.com')
    expect(url).toBeDefined()

    const likes = screen.queryByText('likes 2')
    expect(likes).toBeDefined()
  })

  test('when the like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    const title = screen.getByText('Component testing is done with react-testing-library',  { exact: false })
    expect(title).toBeDefined()

    const author = screen.getByText('Brian Taylor', { exact: false })
    expect(author).toBeDefined()

    const url = screen.queryByText('http://www.briantaylor.com')
    expect(url).toBeDefined()

    const likes = screen.queryByText('likes')
    expect(likes).toBeDefined()

    expect(likeClick.mock.calls).toHaveLength(2)
  })
})
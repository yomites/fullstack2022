const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'another note cypress 1',
    author: 'Brian Kelly',
    url: 'http://gogcypress.com',
    likes: 7,
    id: '628f5b4d2fa44c8e5a4c1676'
  },
  {
    title: 'The building of another note cypress 2',
    author: 'Tommy Hilfieger',
    url: 'http://gogcypress.com',
    likes: 4,
    id: '628f671e7acf608b48f4d437'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Merry go round',
    author: 'Brent Laycon', url: 'www.goround.com', likes: 5 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { initialBlogs, blogsInDb, nonExistingId, usersInDb }
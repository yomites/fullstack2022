const Blog = require('../models/blog')

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

module.exports = { initialBlogs, blogsInDb }
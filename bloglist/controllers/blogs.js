const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const users = await User.find({})
  const user = users[Math.floor(Math.random() * users.length )]
  //  console.log(users[0].id)

  //  const user = await User.findById(body.userId)

  //  const blog = new Blog(request.body)
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes === undefined ? 0 : body.likes,
  })
  //  blog.likes === undefined ? blog.likes = 0 : blog.likes
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (updatedBlog) {
    response.status(204).json(updatedBlog.toJSON())
  } else {
    response.status(404).send('The data could not be found')
  }
})

module.exports = blogsRouter
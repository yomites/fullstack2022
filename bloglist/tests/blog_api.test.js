const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('HTTP requests', () => {
  test('all blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specicifc blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map(r => r.title)
    expect(title).toContain('another note cypress 1')
  })

  test('the unique identifier property of blog post is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    if (blogs.length !== 0) {
      blogs.forEach(element => {
        expect(element.id).toBeDefined()
      })
    }
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Brown James',
      url: 'www.goasync.com',
      likes: 4,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(4)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('async/await simplifies making async calls')
  })

  test('when likes is undefined, http post succeeds with likes taking a default value of 0', async () => {
    const newBlog = {
      title: 'Travelling through the nights',
      author: 'Adam Benky',
      url: 'www.adambenky.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('Travelling through the nights')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
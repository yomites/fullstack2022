const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const title = response.body.map(r => r.title)
    expect(title).toContain('another note cypress 1')
  })
})

describe('existence of unique identifier property of the blop posts', () => {
  test('is confirmed to be named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    if (blogs.length !== 0) {
      blogs.forEach(element => {
        expect(element.id).toBeDefined()
      })
    }
  })
})

var token
beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('salainen', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'salainen' })
  token = response.body.token
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Brown James',
      url: 'www.goasync.com',
      likes: 4,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(4)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('async/await simplifies making async calls')
  })

  test('succeeds when likes is undefined. Blog likes property takes a default value of 0', async () => {
    const newBlog = {
      title: 'Travelling through the nights',
      author: 'Adam Benky',
      url: 'www.adambenky.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('Travelling through the nights')
  })

  test('fails with status code 400 if title and url or any of the two properties is missing', async () => {
    const newBlog = {
      author: 'Kindle Beckoff',
      url:'www.poweralgo.com',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Brown James',
      url: 'www.goasync.com',
      likes: 4,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtStart = (await helper.blogsInDb())
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('succeeds with statuscode 200 if id is valid but blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .set('authorization', `bearer ${token}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '628f7a627acf68f4d43d'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('authorization', `bearer ${token}`)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length)
  })
})

describe('updating a specific blog', () => {
  test('succeeds when the blog exists and have a valid id', async () => {
    const updateValue = {
      likes: 20,
    }
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateValue)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(updateValue.likes).toBe(blogsAtEnd[0].likes)
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with status code 400 if the id is not valid', async () => {
    const invalidId = '23dferth456dfg45rtf678f'

    await api
      .put(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'mluukkai',
      password: 'salainen',
      name: 'Matti Luukkainen',

    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      password: 'salainen',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username is not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      password: 'salainen',
      name: 'Double Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be given')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails if username length is below the required', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      password: 'salainen',
      name: 'Double Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be at least 3 characters long')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if password is not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'roster',
      name: 'Great Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be given')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails if the length of the password is shorter than the required length', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'roster',
      password: 'sa',
      name: 'Great Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
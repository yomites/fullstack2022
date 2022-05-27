const dummy = (blogs) => {
  // The if block is included because or eslint complaints
  if (blogs.length >= 0) {
    return 1
  }
}

const totalLikes = (blogs) => {
  const likesArray = blogs.map(blog => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }
  return likesArray.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const likesArray = blogs.map(blog => blog.likes)
  const indexOfMaxLikes = likesArray.indexOf(Math.max(...likesArray))
  const blogNeededProperties = {
    title: blogs[indexOfMaxLikes].title,
    author: blogs[indexOfMaxLikes].author,
    likes: blogs[indexOfMaxLikes].likes
  }
  return blogNeededProperties
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const authors = blogs.map(aut => aut.author.toUpperCase())
  const authorBlogsCount = {}
  for (const elt of authors) {
    if (authorBlogsCount[elt]) {
      authorBlogsCount[elt] += 1
    } else {
      authorBlogsCount[elt] = 1
    }
  }
  const res = Object.keys(authorBlogsCount).reduce((a, b) => authorBlogsCount[a] > authorBlogsCount[b] ? a : b)
  return { author: res, blogs: authorBlogsCount[res] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const authors = blogs.map(aut =>  {
    return { author: aut.author.toUpperCase(), likes: aut.likes }
  })

  const authorBlogsCount = {}
  for (const elt of authors) {
    if (authorBlogsCount[elt.author]) {
      authorBlogsCount[elt.author] += elt.likes
    } else {
      authorBlogsCount[elt.author] = elt.likes
    }
  }

  const res = Object.keys(authorBlogsCount).reduce((a, b) => authorBlogsCount[a] > authorBlogsCount[b] ? a : b)
  return { author: res, likes: authorBlogsCount[res] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
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
    return null
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

module.exports = { dummy, totalLikes, favoriteBlog }
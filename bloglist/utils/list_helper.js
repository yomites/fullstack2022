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

module.exports = { dummy, totalLikes }
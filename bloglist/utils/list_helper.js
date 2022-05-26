const dummy = (blogs) => {
  // The if block is included because or eslint complaints
  if (blogs.length >= 0) {
    return 1
  }
}

module.exports = { dummy }
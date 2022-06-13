describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' })
  })

  it('Login form is shown', function () {
    cy.contains('log in to the application')
    cy.get('#username-input').parent().should('contain', 'username')
    cy.get('#password-input').parent().should('contain', 'password')
    cy.get('#loginButton').should('contain', 'login')
  })

  describe('Login',function () {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('mluukkai')
      cy.get('#password-input').type('salainen')
      cy.get('#loginButton').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username-input').type('mluukkai')
      cy.get('#password-input').type('wrongpassword')
      cy.get('#loginButton').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('The first test blog')
      cy.get('#author-input').type('Brandon Williams')
      cy.get('#url-input').type('http://www.thisfirsturl.com/index.html')
      cy.get('#createButton').click()

      cy.get('.error')
        .should('contain', 'a new blog The first test blog by Brandon Williams added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains('The first test blog Brandon Williams')
    })
  })

  describe('when several blogs exist', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'The first test blog',
        author: 'Brandon Williams',
        url: 'http://www.thisfirsturl.com/index.html' })
      cy.createBlog({
        title: 'The second test blog',
        author: 'Emmy Brown',
        url: 'http://www.thissecondurl.com/index.html' })
      cy.createBlog({
        title: 'The third test blog',
        author: 'Jane Maddisson',
        url: 'http://www.thisthirdurl.com/index.html' })
    })

    it('user can like any of the blogs', function () {
      cy.contains('The second test blog').parent().as('secondParent')
        .find('#viewButton').click()
      cy.contains('likes 0')
      cy.get('@secondParent').find('#likeButton')
        .click()
      cy.contains('likes 1')
    })

    it('user who created a blog can delete it', function () {
      cy.contains('The third test blog Jane Maddisson').parent().as('theParent')
        .find('#viewButton').click()
      cy.get('@theParent').find('#deleteButton').click()
      cy.get('html')
        .should('not.contain', 'The third test blog Jane Maddisson')
        .and('contain', 'successfully deleted The third test blog by Jane Maddisson')
    })

    it('other users can not delete it', function () {
      cy.createUser({ name: 'Arto Hellas', username: 'hellas', password: 'sekret' })
      cy.contains('logout').click()
      cy.login({ username: 'hellas', password: 'sekret' })

      cy.contains('The first test blog Brandon Williams').parent().find('#viewButton').click()
      cy.get('#deleteButton').should('not.exist')
    })

    it('blogs are arranged in order of likes. Tone with most likes first.', function () {
      cy.contains('The first test blog Brandon Williams').parent().as('firstParent').find('#viewButton')
        .click()
      cy.get('@firstParent').find('#likeButton').click()
      cy.wait(200)

      cy.contains('The second test blog Emmy Brown').parent().as('secondParent')
        .find('#viewButton').click()
      cy.get('@secondParent').find('#likeButton').as('likeButton2')
        .click()
      cy.wait(200)
      cy.get('@likeButton2').click()
      cy.wait(200)

      cy.contains('The third test blog Jane Maddisson').parent().as('thirdParent')
        .find('#viewButton').click()
      cy.get('@thirdParent').find('#likeButton').as('likeButton3')
        .click()
      cy.wait(200)
      cy.get('@likeButton3').click()
      cy.wait(200)
      cy.get('@likeButton3').click()
      cy.wait(200)

      cy.get('.blog').eq(0).should('contain', 'The third test blog Jane Maddisson')
      cy.get('.blog').eq(1).should('contain', 'The second test blog Emmy Brown')
      cy.get('.blog').eq(2).should('contain', 'The first test blog Brandon Williams')
    })
  })
})
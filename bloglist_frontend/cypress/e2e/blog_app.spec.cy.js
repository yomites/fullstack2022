describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to the application')
    cy.get('#username-input').parent().should('contain', 'username')
    cy.get('#password-input').parent().should('contain', 'password')
    cy.get('#loginButton').should('contain', 'login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('mluukkai')
      cy.get('#password-input').type('salainen')
      cy.get('#loginButton').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
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
})
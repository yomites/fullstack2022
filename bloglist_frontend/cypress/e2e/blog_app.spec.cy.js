describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to the application')
    cy.get('#username-input').parent().should('contain', 'username')
    cy.get('#password-input').parent().should('contain', 'password')
    cy.get('#loginButton').should('contain', 'login')
  })
})
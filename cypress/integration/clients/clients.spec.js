describe('Post Resource', () => {
  it('Creating a New Post', () => {
    cy.visit('http://localhost:8080/clients')
    cy.get('.add-client') 
      .click() 

    cy.get('.first-name') 
      .type('Viktor')

    cy.get('.second-name') 
      .type('Chubyrka') 

    cy.get('.phone-number') 
      .type('+380993226219')
    
    cy.get('.submit') 
      .click()

    cy.get('tr:first-child td .edit')
      .click()

    cy.get('.first-name')
      .clear() 
      .type('Vasiliy')

    cy.get('.second-name') 
      .clear()
      .type('Ivanov') 

    cy.get('.phone-number') 
      .clear()
      .type('+38099892292')
    
    cy.get('.submit') 
      .click()
    
    // cy.contains('Submit') // 6.
    //   .click() // 7.

    // cy.url() // 8.
    //   .should('include', '/posts/my-first-post')

    // cy.get('h1') // 9.
    //   .should('contain', 'My First Post')
  })
})
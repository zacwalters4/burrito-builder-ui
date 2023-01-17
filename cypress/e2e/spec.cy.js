// When a user visits the page, they can view the page title and the existing orders
// When a user visits the page, they can view the Form with the proper inputs 
// When a user fills out the form, the information is reflected in the input field's value

describe('Burrito Builder testing', () => {
  beforeEach(() => {
    cy.intercept(`http://localhost:3001/api/v1/orders`, {
      method: 'GET',
      fixture: '../fixtures/orders.json'
    });

    cy.visit('http://localhost:3000');
  })

  it('should have a title', () => {
    cy.contains('Burrito Builder')
  })

  it('should display existing orders', () => {
    cy.get('section')
        .get('div[id=0]')
          .contains('Pat')
    cy.get('section')
      .get('div[id=0]')
        .get('.ingredient-list')
          .contains('beans')
    cy.get('section')
        .get('div[id=1]')
          .contains('Sam')
    cy.get('section')
      .get('div[id=2]')
        .get('.ingredient-list')
          .contains('sofritas')
  })

  it('should have a form with proper inputs', () => {
    cy.get('form')
        .get('input')
          .should('have.attr', 'type', 'text')
    cy.get('form')
        .get('button[name="beans"]')
          .contains('beans')
    cy.get('form')
        .get('button[name="sofritas"]')
          .contains('sofritas')
  })

  it('should have the proper value reflecting the form input', () => {
    cy.get('form')
        .get('input')
          .type('Zac')
            .should('have.value', 'Zac')
    cy.get('form')
      .get('button[name="beans"]')
        .click()
    cy.contains('Order: beans')
    cy.get('form')
    .get('button[name="cilantro"]')
      .click()
  cy.contains('Order: beans, cilantro')
  })
})
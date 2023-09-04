describe('App Component', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should navigate to the InitialPage component', () => {
    cy.get('.initial-page-component').should('exist');
  });

  it('should navigate to the SignUp component', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('.sign-up-component').should('exist');
  });

  it('should navigate to the Movies component', () => {
    cy.visit('http://localhost:3000/movies');
    cy.get('.movies-component').should('exist');
  });

  it('should navigate to the Admin component', () => {
    cy.visit('http://localhost:3000/admin');

    cy.get('.admin-component').should('exist');
  });

});

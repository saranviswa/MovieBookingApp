describe('Admin Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/admin');
  });

  it('should display the page title', () => {
    cy.get('h1').should('contain.text', 'Movie Booking App');
  });

  it('should search for movies', () => {
    const searchTerm = 'Leo';

    cy.get('TextField[label="search"]').type(searchTerm);
    cy.contains('button', 'Search').click();

    cy.get('.movie-card').should('have.length.above', 0);

    cy.contains('.movie-card', 'Leo');
  });

  it('should open and close the "Add Movie" dialog', () => {
    cy.contains('button', 'Add Movie').click();

    cy.get('h2').should('contain.text', 'Add New Movie');

    cy.contains('button', 'Cancel').click();

    cy.get('h2').should('not.exist');
  });

  it('should add a new movie', () => {
    cy.contains('button', 'Add Movie').click();

    cy.get('input[name="movie_name"]').type('Test Movie');
    cy.get('input[name="theatre_name"]').type('Test Theatre');
    cy.get('input[name="available_tickets"]').type('100');
    cy.get('input[name="total_tickets_allotted"]').type('150');
    cy.get('input[name="status"]').type('Now Showing');

    cy.contains('button', 'Add').click();

    cy.get('.snackbar-success').should('be.visible');

    cy.contains('.movie-card', 'Test Movie - Test Theatre');
  });

  it('should open and close the "Delete Movie" dialog', () => {
    cy.contains('button', 'Delete Movie').click();

    cy.get('h2').should('contain.text', 'Delete Movie');

    cy.contains('button', 'Cancel').click();

    cy.get('h2').should('not.exist');
  });

  it('should delete a movie', () => {
    cy.contains('button', 'Delete Movie').click();

    cy.get('input[name="movie_name"]').type('Test Movie');
    cy.get('input[name="theatre_name"]').type('Test Theatre');

    cy.contains('button', 'Delete').click();

    cy.get('.snackbar-success').should('be.visible');

    cy.contains('.movie-card', 'Test Movie - Test Theatre').should('not.exist');
  });
});

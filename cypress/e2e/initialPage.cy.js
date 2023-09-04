describe('InitialPage Component', () => {
    before(() => {
      cy.visit('http://localhost:3000'); 
    });
  
    it('should display the InitialPage component', () => {
      cy.get('.initial-page-component').should('exist');
    });
  
    it('should allow users to sign in', () => {
      cy.get('input[name="email"]').type('user@example.com');
      cy.get('input[name="password"]').type('password123');
  
      cy.contains('Sign In').click();
      cy.url().should('include', '/movies');
    });
  
    it('should allow users to reset their password', () => {
      cy.contains('Forgot password?').click();
      cy.get('input[name="emailID"]').type('user@example.com');
      cy.contains('Get Security Question').click();
      cy.get('input[name="securityAnswer"]').type('security_answer');
      cy.get('input[name="newPassword"]').type('new_password');
      cy.get('input[name="confirmNewPassword"]').type('new_password');
      cy.contains('Reset Password').click();
      cy.contains('Password reset successful').should('exist');
    });
  
  });
  
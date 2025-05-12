class LoginPage {
  username(username) {
    cy.get('[name="username"]').type(username); 
  }

  password(password) {
    cy.get('[name="password"]').type(password); 
  }

  loginButton() {
    cy.get('[type="submit"]').click(); 
  }
}

export const loginPage = new LoginPage();
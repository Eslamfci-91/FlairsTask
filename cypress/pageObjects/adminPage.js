class AdminPage {
  clickAdminTab() {
    cy.get(':nth-child(1) > .oxd-main-menu-item').click();
  }

  getNumberOfRecords() {
  return cy.get('.orangehrm-horizontal-padding > .oxd-text') 
    .invoke('text') // Get the text
    .then((text) => {
      const match = text.match(/\d+/); // Extract the number from the text
      return match ? parseInt(match[0], 10) : 0; // Return the number or 0 if no match
    });
}

  clickAddButton() {
    cy.get('.orangehrm-header-container > .oxd-button').click();
  }

  fillNewUserForm(user, generatedUsername) {
  // Select Role
  cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click(); // Click the dropdown
  cy.contains('.oxd-select-dropdown > div', user.role).click(); 

  // Enter Employee Name 
  cy.get('.oxd-autocomplete-text-input > input').click(); // Click the input field
  cy.get('.oxd-autocomplete-text-input > input').type(user.employeeName); // Type part of the employee name
  cy.wait(5000); // Wait for 5 seconds
  cy.get('.oxd-autocomplete-dropdown[role="listbox"]', { timeout: 10000 }).should('be.visible'); // Wait for the dropdown to appear
  cy.get('.oxd-autocomplete-dropdown[role="listbox"] > div').first().click(); // Select the first option
  // Select Status
  cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click(); // Click the dropdown
  cy.contains('.oxd-select-dropdown > div', user.status).click(); // Select status

  // Enter Username
  cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(generatedUsername);

  // Enter Password
  cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type(user.password);

  // Confirm Password
  cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(user.password);
}

  clickSaveButton() {
    cy.get('.oxd-button--secondary').click();
  }

  searchUser(username) {
      cy.get(':nth-child(2) > .oxd-input').clear().type(username); 
    cy.get('.oxd-form-actions > .oxd-button--secondary').click(); 
  }

  deleteUser(username) {
    this.searchUser(username);
    cy.get('.oxd-table-cell-actions > :nth-child(1) > .oxd-icon').click(); 
    cy.get('.oxd-button--label-danger').click(); 
    cy.get('.oxd-button--ghost').click();
  }
}

export const adminPage = new AdminPage();
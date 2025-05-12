import { generateUniqueUsername } from '../support/generateData';
import { loginPage } from '../pageObjects/loginPage';
import { adminPage } from '../pageObjects/adminPage';

let testData;

before(() => {
  // Detect the language dynamically
  cy.visit('/'); // Navigate to the website
  cy.get('.oxd-text--h5').invoke('text').then((headerText) => {
    let language = 'en'; // Default to English
    if (headerText.includes('Login')) {
      language = 'en';
    } else {
      language = 'es';
    }

    cy.fixture(`testData.${language}.json`).then((data) => {
      testData = data;
    });
  });
});
describe('Automation Task', () => {
  it('should log in and perform admin actions', () => {
    // Step 1: Navigate to the login page
    cy.visit('/');

    // Step 2: Log in
    loginPage.username(testData.username);
    loginPage.password(testData.password);
    loginPage.loginButton();

    // Step 3: Click on Admin tab
    adminPage.clickAdminTab();

    // Step 4: Get the number of records
    adminPage.getNumberOfRecords().then((initialCount) => {
      // Step 5: Click on Add button
      adminPage.clickAddButton();

      // Step 6: Generate a unique username and fill new user form
      const generatedUsername = generateUniqueUsername();
      adminPage.fillNewUserForm(testData.newUser, generatedUsername);

      // Step 7: Click on Save button
      adminPage.clickSaveButton();

      // Step 8: Verify the number of records increased by 1
      adminPage.getNumberOfRecords().should('eq', initialCount + 1);

      // Step 9: Search for the new user
      adminPage.searchUser(generatedUsername);

      // Step 10: Delete the new user
      adminPage.deleteUser(generatedUsername);

      // Step 11: Verify the number of records decreased by 1
      adminPage.getNumberOfRecords().should('eq', initialCount);
    });
  });
});
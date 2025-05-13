export class ApiHelper {
  static getCsrfToken() {
    // Fetch the CSRF token from the login page
    return cy.request({
      method: 'GET',
      url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    }).then((response) => {

      // Extract the CSRF token from the :token attribute
      const tokenMatch = response.body.match(/:token="&quot;([^&]+)&quot;"/);
      const csrfToken = tokenMatch ? tokenMatch[1] : null;

      // Log the extracted token for debugging
      cy.log('Extracted CSRF Token:', csrfToken);

      // Assert that the token exists
      expect(csrfToken).to.exist;

      // Return the token
      return cy.wrap(csrfToken);
    });
  }

  static validateLogin(csrfToken, username, password) {
    // Validate the login using the CSRF token
    return cy.request({
      method: 'POST',
      url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `_token=${csrfToken}&username=${username}&password=${password}`,
      form: true, // Automatically encode the body as form data
    }).then((response) => {
      expect(response.status).to.eq(200); // Verify the request was successful
      return cy.wrap(response); 
    });
  }

  static addCandidate(sessionCookie, candidateData) {
    // Add a candidate using the API
    return cy.request({
      method: 'POST',
      url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates',
      headers: {
        'Content-Type': 'application/json',
        Cookie: sessionCookie, // Include the session cookie
      },
      body: candidateData, // Pass the candidate data as JSON
    }).then((response) => {
      expect(response.status).to.eq(200); // Verify the candidate was added successfully
      return cy.wrap(response.body.data.id); // 
    });
  }

  static deleteCandidate(sessionCookie, candidateId) {
    // Delete a candidate using the API
    return cy.request({
      method: 'DELETE',
      url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates`,
      headers: {
        Cookie: sessionCookie, // Include the session cookie
      },
      body: {
        ids: [candidateId], // Pass the candidate ID to delete in Array
      },
    }).then((response) => {
      expect(response.status).to.eq(200); // Verify the candidate was deleted successfully
    });
  }
    
}
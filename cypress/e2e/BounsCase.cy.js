import { ApiHelper } from '../support/apiHelper';

describe('Bonus Task: Add and Delete Candidate via API', () => {
  let csrfToken;
  let sessionCookie;
  let candidateId;

  const candidateData = {
    firstName: 'Eslam',
    middleName: 'Adel',
    lastName: 'Mohamed',
    email: 'eeee@eee.com',
    contactNumber: null,
    keywords: null,
    comment: null,
    dateOfApplication: '2025-05-14',
    consentToKeepData: false,
  };

  before(() => {
    // Step 1: Fetch the CSRF token and validate login
    ApiHelper.getCsrfToken().then((token) => {
      csrfToken = token; // Store the CSRF token
      return ApiHelper.validateLogin(csrfToken, 'Admin', 'admin123');
    }).then((response) => {
      sessionCookie = response.headers['set-cookie']; // Capture the session cookie
    });
  });

  it('should add and delete a candidate using APIs', () => {
    // Step 2: Add a candidate
    ApiHelper.addCandidate(sessionCookie, candidateData).then((id) => {
      candidateId = id; // Store the candidate ID for deletion

      // Step 3: Delete the candidate
      ApiHelper.deleteCandidate(sessionCookie, candidateId);
    });
  });
});
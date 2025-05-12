import { faker } from '@faker-js/faker';

function generateUniqueUsername() {
  return faker.internet.userName(); // Generate a unique username
}

export default { generateUniqueUsername };
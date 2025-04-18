import { faker } from '@faker-js/faker';
import { createHash } from './index.js';

const generatePets = () => {
  return {
    name: faker.person.firstName(),
    specie: faker.animal.type(),
    birthDate: faker.date.past(5),
    adopted: false,
    owner: faker.database.mongodbObjectId(),
    image: faker.image.url(),
  };
};

const generateUsers = async () => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: await createHash('coder123'),
    role: faker.datatype.boolean() ? 'user' : 'admin',
    pets: [],
  };
};

export { generatePets, generateUsers };

import { generateUsers, generatePets } from './mocks.js';
import CustomError from './errors/customError.js';
import EErrors from './errors/errorsEnums.js';
import {
  generatePetsMockedDataErrorInfo,
  generateUsersMockedDataErrorInfo,
} from './errors/errorsInfos.js';

// Generate a list of mocked users
const generateMockUsers = async (count) => {
  try {
    const usersList = [];

    for (let i = 0; i < Number(count); i++) {
      const user = await generateUsers();
      usersList.push(user);
    }

    if (!usersList.length) {
      throw CustomError.create({
        name: 'Mocked data generation Error',
        cause: generateUsersMockedDataErrorInfo(),
        message: 'Fail generating users mocked data',
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
    }

    return usersList;
  } catch (e) {
    console.error(e);
    throw CustomError.create({
      name: 'Mocked data generation Error',
      cause: generateUsersMockedDataErrorInfo(),
      message: 'Fail generating users mocked data',
      code: EErrors.INTERNAL_SERVER_ERROR,
    });
  }
};

// Generate a list of mocked pets

const generateMockPets = async (count) => {
  try {
    const petsList = [];

    for (let i = 0; i < Number(count); i++) {
      const pet = await generatePets();
      petsList.push(pet);
    }

    if (!petsList.length) {
      throw CustomError.create({
        name: 'Mocked data generation Error',
        cause: generatePetsMockedDataErrorInfo(),
        message: 'Fail generating pets mocked data',
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
    }

    return petsList;
  } catch (e) {
    console.error(e);
    throw CustomError.create({
      name: 'Mocked data generation Error',
      cause: generateUsersMockedDataErrorInfo(),
      message: 'Fail generating users mocked data',
      code: EErrors.INTERNAL_SERVER_ERROR,
    });
  }
};

export { generateMockPets, generateMockUsers };

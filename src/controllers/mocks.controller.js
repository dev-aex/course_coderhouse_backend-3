import { usersService } from '../services/index.js';
import { petsService } from '../services/index.js';
import { generateUsers, generatePets } from '../utils/mocks.js';
import CustomError from '../utils/errors/customError.js';
import EErrors from '../utils/errors/errorsEnums.js';
import {
  generatePetsMockedDataErrorInfo,
  generateUsersMockedDataErrorInfo,
} from '../utils/errors/errorsInfos.js';

const generateMockingData = async (req, res, next) => {
  const { users = 0, pets = 0 } = req.params;
  try {
    const petsList = [];

    for (let i = 0; i < Number(pets); i++) {
      const pet = await generatePets();
      petsList.push(pet);
    }

    if (!petsList) {
      CustomError.create({
        name: 'Mocked data generation Error',
        cause: generatePetsMockedDataErrorInfo(),
        message: 'Fail generating pets mocked data',
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
    }

    const savedPets = await petsService.insert(petsList);

    const usersList = [];

    for (let i = 0; i < Number(users); i++) {
      const user = await generateUsers();
      usersList.push(user);
    }

    if (!usersList) {
      CustomError.create({
        name: 'Mocked data generation Error',
        cause: generateUsersMockedDataErrorInfo(),
        message: 'Fail generating users mocked data',
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
    }

    const savedUsers = await usersService.insert(usersList);

    const result = {
      users: savedUsers.length,
      pets: savedPets.length,
    };

    res.status(200).json({ status: 'success', payload: result });
  } catch (error) {
    next(error);
  }
};

const generateMockingUsers = async (req, res, next) => {
  const { users } = req.params;
  console.log(`users: `, users);

  try {
    const usersList = [];

    for (let i = 0; i < Number(users); i++) {
      const user = await generateUsers();
      usersList.push(user);
    }

    if (!usersList) {
      CustomError.create({
        name: 'Mocked data generation Error',
        cause: generateUsersMockedDataErrorInfo(),
        message: 'Fail generating users mocked data',
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
    }

    res.status(200).json({ status: 'success', payload: usersList });
  } catch (error) {
    next(error);
  }
};

const generateMockingPets = async (req, res, next) => {
  const { pets } = req.params;
  try {
    const petsList = [];

    for (let i = 0; i < Number(pets); i++) {
      const pet = await generatePets();
      petsList.push(pet);
    }

    if (!petsList) {
      CustomError.create({
        name: 'Mocked data generation Error',
        cause: generatePetsMockedDataErrorInfo(),
        message: 'Fail generating pets mocked data',
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
    }

    res.status(200).json({ status: 'success', payload: petsList });
  } catch (error) {
    next(error);
  }
};

export default {
  generateMockingData,
  generateMockingUsers,
  generateMockingPets,
};

import { usersService } from '../services/index.js';
import { petsService } from '../services/index.js';
import {
  generateMockUsers,
  generateMockPets,
} from '../utils/generateMockData.js';

// Generate a list of mocked users and pets, and save it to DB
const generateMockingData = async (req, res, next) => {
  const { users = 0, pets = 0 } = req.params;

  try {
    const petsList = await generateMockPets(pets);
    const savedPets = await petsService.insert(petsList);

    const usersList = await generateMockUsers(users);
    const savedUsers = await usersService.insert(usersList);

    const result = {
      users: savedUsers.length,
      pets: savedPets.length,
    };

    res.status(200).json({
      status: 'success',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// Generate a list of mocked users

const generateMockingUsers = async (req, res, next) => {
  const { users } = req.params;

  try {
    const usersList = await generateMockUsers(users);

    res.status(200).json({
      status: 'success',
      payload: usersList,
    });
  } catch (error) {
    next(error);
  }
};

// Generate a list of mocked pets

const generateMockingPets = async (req, res, next) => {
  const { pets } = req.params;

  try {
    const petsList = await generateMockPets(pets);

    res.status(200).json({
      status: 'success',
      payload: petsList,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  generateMockingData,
  generateMockingUsers,
  generateMockingPets,
};

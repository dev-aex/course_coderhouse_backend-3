import {
  adoptionsService,
  petsService,
  usersService,
} from '../services/index.js';

import CustomError from '../utils/errors/customError.js';
import EErrors from '../utils/errors/errorsEnums.js';
import {
  getAllAdoptionsErrorInfo,
  getOneAdoptionErrorInfo,
  getOneUserErrorInfo,
  getOnePetErrorInfo,
  PetExistErrorInfo,
} from '../utils/errors/errorsInfos.js';

// Get all adoptions

const getAllAdoptions = async (req, res, next) => {
  try {
    const result = await adoptionsService.getAll();

    if (!result) {
      throw CustomError.create({
        name: 'Adoptions Not Found',
        cause: getAllAdoptionsErrorInfo(),
        message: 'Fail getting all adoptions',
        code: EErrors.RESOURCE_NOT_FOUND,
      });
    }

    res.send({ status: 'success', payload: result });
  } catch (error) {
    next(error);
  }
};

// Get an adoption by ID

const getAdoption = async (req, res, next) => {
  const adoptionId = req.params.aid;
  try {
    const adoption = await adoptionsService.getBy({ _id: adoptionId });

    if (!adoption) {
      throw CustomError.create({
        name: 'Adoption Not Found',
        cause: getOneAdoptionErrorInfo(),
        message: 'Fail getting a adoption',
        code: EErrors.RESOURCE_NOT_FOUND,
      });
    }

    res.send({ status: 'success', payload: adoption });
  } catch (error) {
    next(error);
  }
};

// Create a adoption

const createAdoption = async (req, res, next) => {
  const { uid, pid } = req.params;
  try {
    const user = await usersService.getUserById(uid);

    if (!user) {
      throw CustomError.create({
        name: 'User Not Found',
        cause: getOneUserErrorInfo(),
        message: 'Fail getting a user',
        code: EErrors.RESOURCE_NOT_FOUND,
      });
    }

    const pet = await petsService.getBy({ _id: pid });

    if (!pet) {
      throw CustomError.create({
        name: 'Pet Not Found',
        cause: getOnePetErrorInfo(),
        message: 'Fail getting a pet',
        code: EErrors.RESOURCE_NOT_FOUND,
      });
    }

    if (pet.adopted) {
      throw CustomError.create({
        name: 'Pet Exist',
        cause: PetExistErrorInfo(),
        message: 'Pet is already adopted',
        code: EErrors.CONFLICT_ERROR,
      });
    }

    user.pets.push(pet._id);

    await usersService.update(user._id, { pets: user.pets });

    await petsService.update(pet._id, { adopted: true, owner: user._id });

    await adoptionsService.create({ owner: user._id, pet: pet._id });

    res.send({ status: 'success', message: 'Pet adopted', payload: user });
  } catch (error) {
    next(error);
  }
};

export default {
  createAdoption,
  getAllAdoptions,
  getAdoption,
};

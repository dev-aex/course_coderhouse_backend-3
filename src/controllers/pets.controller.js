import PetDTO from '../dto/Pet.dto.js';
import { petsService } from '../services/index.js';
import __dirname from '../utils/index.js';

import CustomError from '../utils/errors/customError.js';
import EErrors from '../utils/errors/errorsEnums.js';
import {
  getAllPetsErrorInfo,
  getOnePetErrorInfo,
  deleteOnePetErrorInfo,
  updateOnePetErrorInfo,
} from '../utils/errors/errorsInfos.js';

// Get all pets

const getAllPets = async (req, res, next) => {
  try {
    const pets = await petsService.getAll();

    if (!pets) {
      throw CustomError.create({
        name: 'Pets Not Found',
        cause: getAllPetsErrorInfo(),
        message: 'Fail getting all pets',
        code: EErrors.RESOURCE_NOT_FOUND,
      });
    }

    res.send({ status: 'success', payload: pets });
  } catch (error) {
    next(error);
  }
};

// Create one pet

const createPet = async (req, res, next) => {
  const { name, specie, birthDate } = req.body;
  try {
    if (!name || !specie || !birthDate)
      return res
        .status(400)
        .send({ status: 'error', error: 'Incomplete values' });

    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });

    const result = await petsService.create(pet);

    res.send({ status: 'success', payload: result });
  } catch (error) {
    next(error);
  }
};

// Update one pet by ID

const updatePet = async (req, res, next) => {
  const petUpdateBody = req.body;
  try {
    const petId = req.params.pid;

    if (!petId) {
      throw CustomError.create({
        name: 'Pet Not Found',
        cause: getOnePetErrorInfo(),
        message: 'Fail getting all pets',
        code: EErrors.RESOURCE_NOT_FOUND,
      });
    }

    const result = await petsService.update(petId, petUpdateBody);

    if (!result) {
      throw CustomError.create({
        name: 'Error updating pet',
        cause: updateOnePetErrorInfo(),
        message: 'Fail to update pet',
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
    }

    res.send({ status: 'success', message: 'pet updated' });
  } catch (error) {
    next(error);
  }
};

// Delete one pet by ID

const deletePet = async (req, res, next) => {
  try {
    const petId = req.params.pid;

    if (!petId) {
      throw CustomError.create({
        name: 'Pet Not Found',
        cause: getOnePetErrorInfo(),
        message: 'Fail getting all pets',
        code: EErrors.RESOURCE_NOT_FOUND,
      });
    }

    const result = await petsService.delete(petId);

    if (!result) {
      throw CustomError.create({
        name: 'Error deleting pet',
        cause: deleteOnePetErrorInfo(),
        message: 'Fail to delete pet',
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
    }

    res.send({ status: 'success', message: 'pet deleted' });
  } catch (error) {
    next(error);
  }
};

// Create a pet with an image

const createPetWithImage = async (req, res, next) => {
  const file = req.file;
  const { name, specie, birthDate } = req.body;

  try {
    if (!name || !specie || !birthDate)
      return res
        .status(400)
        .send({ status: 'error', error: 'Incomplete values' });

    const pet = PetDTO.getPetInputFrom({
      name,
      specie,
      birthDate,
      image: `${__dirname}/../public/img/${file.filename}`,
    });

    const result = await petsService.create(pet);

    res.send({ status: 'success', message: 'pet created', payload: result });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  createPetWithImage,
};

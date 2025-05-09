import { Router } from 'express';
import mocksController from '../controllers/mocks.controller.js';
import validate from '../middlewares/validators.middleware.js';
import {
  mockedUsersSchema,
  mockedPetsSchema,
  mockedDataSchema,
} from '../validators/mocks.validator.js';

const router = Router();

router.post(
  '/generatedata/:users/:pets',
  validate(mockedDataSchema),
  mocksController.generateMockingData
);

router.get(
  '/mockingusers/:users',
  validate(mockedUsersSchema),
  mocksController.generateMockingUsers
);

router.get(
  '/mockingpets/:pets',
  validate(mockedPetsSchema),
  mocksController.generateMockingPets
);

export default router;

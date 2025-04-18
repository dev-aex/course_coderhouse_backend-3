import { Router } from 'express';
import mocksController from '../controllers/mocks.controller.js';

const router = Router();

router.post('/generatedata/:users/:pets', mocksController.generateMockingData);
router.get('/mockingusers/:users', mocksController.generateMockingUsers);
router.get('/mockingpets/:pets', mocksController.generateMockingPets);

export default router;

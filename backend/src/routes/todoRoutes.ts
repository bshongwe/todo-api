import { Router } from 'express';
import { todoController } from '../controllers/todoController.js';

const router = Router();

// Create and Get routes
router.post('/', todoController.create);
router.get('/', todoController.getAll);

export default router;
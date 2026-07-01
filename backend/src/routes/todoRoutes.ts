import { Router } from 'express';
import { todoController } from '../controllers/todoController.js';

const router = Router();

// Create and Read routes
router.post('/', todoController.create);
router.get('/', todoController.getAll);
router.get('/:id', todoController.getById);
router.patch('/:id', todoController.update);
router.delete('/:id', todoController.delete);

export default router;
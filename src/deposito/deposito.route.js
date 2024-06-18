import { Router } from 'express';
import { createDeposito, getDepositos, getDepositoById, updateDeposito, deleteDeposito } from '../controllers/depositoController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/', verifyToken, createDeposito);
router.get('/', verifyToken, getDepositos);
router.get('/:id', verifyToken, getDepositoById);
router.put('/:id', verifyToken, updateDeposito);
router.delete('/:id', verifyToken, deleteDeposito);

export default router;

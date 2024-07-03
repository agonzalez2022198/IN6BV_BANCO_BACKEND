import { Router } from 'express';
import { createDeposito, getDepositos, getDepositoById, updateDeposito, deleteDeposito } from '../deposito/deposito.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/dep',  createDeposito);
router.get('/',  getDepositos);
router.get('/:id', verifyToken, getDepositoById);
router.put('/:id', verifyToken, updateDeposito);
router.delete('/:id', verifyToken, deleteDeposito);

export default router;
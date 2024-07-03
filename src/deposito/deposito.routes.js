import { Router } from 'express';
import { createDeposito, getDepositos, getDepositoById, updateDeposito, 
    deleteDeposito } from '../deposito/deposito.contrller.js';
//import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/dep',  createDeposito);
router.get('/',  getDepositos);
router.get('/:id', getDepositoById);
router.put('/:id', updateDeposito);
router.delete('/:id', deleteDeposito);

export default router;
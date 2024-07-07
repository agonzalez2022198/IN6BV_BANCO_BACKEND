import { Router } from 'express';
import { createDeposito, getDepositos, getDepositoById, updateDeposito, 
    deleteDeposito } from '../deposito/deposito.contrller.js';

const router = Router();

router.post('/depo',  createDeposito);
router.get('/',  getDepositos);
router.get('/:id', getDepositoById);
router.put('/:id', updateDeposito);
router.delete('/:id', deleteDeposito);

export default router;
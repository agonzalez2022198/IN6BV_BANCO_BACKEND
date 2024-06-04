import express from 'express';
import { createAccount, 
        deleteAccount, 
        getAccount, 
        getAccountById, 
        updateAccount } from './account.controller.js';

const router = express.Router();

// Definir la ruta POST para crear una nueva cuenta
router.post('/', createAccount);

router.get('/', getAccount);

router.get('/:id', getAccountById);

router.put('/:id', updateAccount);

router.delete('/:id', deleteAccount);

export default router;
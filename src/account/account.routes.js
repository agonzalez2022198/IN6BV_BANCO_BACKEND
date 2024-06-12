import express from 'express';
import { createAccount } from './account.controller.js';

const router = express.Router();

// Definir la ruta POST para crear una nueva cuenta
router.post('/', createAccount);

export default router;
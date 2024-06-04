import express from 'express';
import { createTypeAccount } from './typeAccount.controller.js';
const router = express.Router();

router.post('/', createTypeAccount);

export default router;
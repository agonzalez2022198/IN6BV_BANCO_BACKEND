import express from 'express';
import { createAccount, getAccount, userAccount } from './account.controller.js';
import {validarJWT} from '../middlewares/validate-jwt.js'

const router = express.Router();

router.post('/acc', createAccount);

router.get('/bank-accounts', validarJWT, userAccount);

router.get('/', getAccount);
export default router;
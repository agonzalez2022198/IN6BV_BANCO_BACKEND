import { Router } from 'express';
import { createBusqueda, getBusquedas, getBusquedaById, deleteBusqueda } from '../search/busqueda.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/', verifyToken, createBusqueda);
router.get('/', verifyToken, getBusquedas);
router.get('/:id', verifyToken, getBusquedaById);
router.delete('/:id', verifyToken, deleteBusqueda);

export default router;

import { Router } from "express";
import { check } from "express-validator";

import { login} from "./auth.controller.js";
import { validarCampos } from "../middlewares/validate-fields.js";
//import { existenteEmail } from "../helpers/db-validators.js";
import { validarJWT } from "../middlewares/validate-jwt.js";



const router = Router()

router.post(
    '/login',
    [

        check('correo', 'Este no es un correo válido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ], login
);

export default router;
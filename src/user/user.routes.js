import { Router } from "express";
import { check } from "express-validator";

import {postUser, getUsers, getUserById, putUser, deleteUser} from "./user.controller.js"

import {existeUsuarioById} from "../helpers/db-validator.js";

import { validarCampos } from "../middlewares/validate-fields.js";
import { validarJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post(
    "/addUser",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("nickName", "El nombre es obligatorio").not().isEmpty(),
        check("userName", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El nombre es obligatorio").not().isEmpty(),
        check("DPI", "El nombre es obligatorio").not().isEmpty(),
        check("DPI", "Deb ser de 13").isLength({
            min: 13, max: 13,
        }),
        check("location", "El nombre es obligatorio").not().isEmpty(),
        check("celular", "El nombre es obligatorio").not().isEmpty(),
        check("correo", "El nombre es obligatorio").not().isEmpty(),
        check("monthlyIncome", "El nombre es obligatorio").not().isEmpty(),
        //check("credit", "El nombre es obligatorio").not().isEmpty(),
    ],
    postUser
);

router.get("/", getUsers);

router.get(
  "/:id",
  [
    check("id", "This is not a valid id").isMongoId(),
  ],
  getUserById
);

router.put(
    "/:id",
    [
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeUsuarioById),
      validarCampos,
    ],
    putUser
);

router.delete(
    "/:id",
    [
      //validarJWT,
      //tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeUsuarioById),
      validarCampos,
    ],
    deleteUser
  );


export default router;
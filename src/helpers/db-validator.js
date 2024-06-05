import User from "../user/user.model.js";

export const existeUsuarioById = async (id = '') =>{
    const existeUsuario = await User.findById(id)
    if(!existeUsuario){
        throw new Error(` el ID: ${id} no existe` )
    }
}

export const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({ correo });
    if (existeEmail) {
      throw new Error(`El email ${correo} ya fue registrado`);
    }
}
import User from "../user/user.model.js";

export const existeUsuarioById = async (id = '') =>{
    const existeUsuario = await User.findById(id)
    if(!existeUsuario){
        throw new Error(` el ID: ${id} no existe` )
    }
}
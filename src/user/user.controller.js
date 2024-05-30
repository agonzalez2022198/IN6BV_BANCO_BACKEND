import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import User from './user.model.js';


export const postUser = async (req, res) => {
    const {
        name, nickName, userName, password, DPI,
        location, celular, correo, monthlyIncome
    } = req.body;

    const user = new User({
        name, nickName, userName, password, DPI, 
        location, celular, correo, monthlyIncome
    });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });

    
}
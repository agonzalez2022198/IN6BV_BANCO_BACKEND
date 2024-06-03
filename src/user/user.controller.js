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

    try {
        const salt = bcryptjs.genSaltSync();  // Cambiado a genSaltSync
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error saving user',
            error
        });
    }
}
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


export const getUsers = async (req, res = response) => {
    const { end, start } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(start))
            .limit(Number(end))
    ]);

    res.status(200).json({
        total,
        users
    });
}


export const getUserById = async (req, res) => {
    const {id} = req.body;
    const user = await User.findOne({_id: id});
    
    res.status(200).json({
        user
    })
}

export const putUser = async (req, res = response) => {
    const { id } = req.body;
    const { _id, password, role, state, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, resto);

    const user = await User.findOne({_id: id});

    res.status(200).json({
        msg: 'Updated user!!',
        user
    });
}


export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });

    res.status(200).json({
        msg: 'This user was DELETED:',
        user
    });

}

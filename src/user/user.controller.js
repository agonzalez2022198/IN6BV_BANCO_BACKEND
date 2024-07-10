import { response } from 'express';
import bcryptjs from 'bcryptjs';
import User from './user.model.js';
import axios from 'axios';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  }
});

const verifyEmail = async (email) => {
  const apiKey = process.env.ZEROBOUNCE_API_KEY;
  const url = `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${email}`;

  try {
    const response = await axios.get(url);
    console.log('Respuesta de la API de ZeroBounce:', response.data);
    return response.data.status === 'valid';
  } catch (error) {
    console.error('Error al verificar el correo electrónico:', error.message);
    return false;
  }
};

export const postUser = async (req, res) => {
    const {
        name, nickName, userName, password, DPI,
        location, celular, correo, monthlyIncome
    } = req.body;

    /*const isEmailValid = await verifyEmail(correo);
    if (!isEmailValid) {
        return res.status(400).json({
            msg: 'Correo electrónico no válido o no existe.'
        });
    }*/
    

    let uniqueCode;
    let codeExists = true;

    while (codeExists) {
        uniqueCode = Math.floor(1000 + Math.random() * 9000); // Genera un código de 4 dígitos
        const existingUser = await User.findOne({ code: uniqueCode });
        if (!existingUser) {
            codeExists = false;
        }
    }

    const user = new User({
        name, nickName, userName, password, code: uniqueCode, DPI,
        location, celular, correo, monthlyIncome
    });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    const mailOptions = {
        from: process.env.EMAIL,
        to: correo,
        subject: 'Datos de tu nueva cuenta bancaria',
        text: `Hola ${name},

Tu cuenta bancaria ha sido creada exitosamente. Aquí están los detalles de tu cuenta:

Código de la cuenta: ${user.code}
Nombre de usuario: ${userName}
DPI: ${DPI}

Gracias por confiar en nosotros.

Atentamente,
Tu Banco`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });

    res.status(200).json({
        user
    });
};


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
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const putUser = async (req, res = response) => {
    const { id } = req.body;
    const { _id, password, role, state, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, resto);

    const user = await User.findOne({ _id: id });

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
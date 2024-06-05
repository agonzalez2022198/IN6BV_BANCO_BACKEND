'use strict';
import User from '../src/user/user.model.js'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import bcryptjs from 'bcryptjs';
import multer from 'multer';
import accountRoutes from '../src/account/account.routes.js';
import userRoutes from "../src/user/user.routes.js";
import typeAccountRoutes from '../src/typeAccount/typeAccount.routes.js';
import authRoutes from '../src/auth/auth.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.accountPath = '/kinalbank/v1/account';
        this.userPath = '/kinalbank/v1/user';
        this.typeAccountPath = '/kinalbank/v1/typeAccount'
        this.authPath = '/kinalbank/v1/auth'
        this.upload = multer({ dest: 'uploads/' });

        this.middlewares();
        this.conectarDB();
        this.routes();
        // this.createUser();
    }

    async conectarDB() {
        await dbConnection();

        const lengthUsers = await User.countDocuments();
        if (lengthUsers > 0) return;
        const salt = bcryptjs.genSaltSync();
        const password = bcryptjs.hashSync('123456', salt);

        const adminUser = new User({
            name: "ADMIN",
            userName: "adminUserName",
            password: password,
            role: "ADMIN_ROLE",
            DPI: "1234567891012",
            celular: "123456789",
            correo: "admin@gmail.com",
        });

        await adminUser.save();
        console.log(adminUser);
    }




    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.accountPath, accountRoutes);
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.typeAccountPath, typeAccountRoutes);
        this.app.use(this.authPath, authRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }
}

export default Server;

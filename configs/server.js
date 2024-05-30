'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import bcryptjs from 'bcryptjs';
import multer from 'multer';
import userRoutes from '../src/user/user.routes.js';
import User from "../src/user/user.model.js";


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.userPath = '/bank/v1/user';

        this.upload = multer({ dest: 'uploads/' })

        this.middlewares();
        this.conectarDB();
        this.routes();
        this.createUser();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    async createUser() {
        const existeUser = await User.findOne({ email: 'admin@gmail.com' });

        if (!existeUser) {
            const userAdminCreate = {
                name: "Pedro",
                nickName: "Motta",
                userName: "pMotta",
                password: "123456",
                DPI: "2334565678123",
                location: "11 calle 22-34 zona 13",
                celular: "34546578",
                correo: "pmotta@gmail.com",
                monthlyIncome: "1200",
                USER_ROLE: "ADMIN_ROLE"
            };

            const saltAdmin = bcryptjs.genSaltSync();
            userAdminCreate.password = bcryptjs.hashSync(userAdminCreate.password, saltAdmin);

            const userAdmin = new User(userAdminCreate);
            await userAdmin.save();

            /*const userHotelCreate = {
                email: 'hotel@gmail.com',
                password: '123456',
                name: "hotel default",
                lastName: "lastname hotel default",
                role: 'HOTEL_ROLE',
            };

            const saltHotel = bcryptjs.genSaltSync();
            userHotelCreate.password = bcryptjs.hashSync(userHotelCreate.password, saltHotel);

            const userHotel = new User(userHotelCreate);
            await userHotel.save();

            const userCreate = {
                email: 'user@gmail.com',
                password: '123456',
                name: "user default",
                lastName: "user lastname",
                role: 'USER_ROLE',
            };

            const salt = bcryptjs.genSaltSync();
            userCreate.password = bcryptjs.hashSync(userCreate.password, salt);

            const user = new User(userCreate);
            await user.save();*/
        }
    }

    routes() {
        this.app.use(this.userPath, userRoutes);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }


}


export default Server;
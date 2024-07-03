import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import bcryptjs from 'bcryptjs';
import multer from 'multer';
import userRoutes from '../src/user/user.routes.js';
import User from "../src/user/user.model.js";
import authRoutes from '../src/auth/auth.routes.js';
import accountRoutes from '../src/account/account.routes.js';


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.userPath = '/bank/v1/user';
        this.authPath = '/bank/v1/auth';

        this.accountPath = '/bank/v1/account';

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
        const existeUser = await User.findOne({ correo: 'pmotta@gmail.com' });

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
                role: "ADMIN_ROLE"
            };

            const saltAdmin = bcryptjs.genSaltSync();
            userAdminCreate.password = bcryptjs.hashSync(userAdminCreate.password, saltAdmin);

            const userAdmin = new User(userAdminCreate);
            await userAdmin.save();
            console.log(userAdmin)
        }
    }

    routes() {
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.accountPath, accountRoutes);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }


}


export default Server;

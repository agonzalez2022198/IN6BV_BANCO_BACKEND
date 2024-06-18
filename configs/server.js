'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import bcryptjs from 'bcryptjs';
import multer from 'multer';
import depositoRoutes from '../src/deposito/deposito.route.js';


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.depositoPath = '/Bank/v1/deposito';

        this.upload = multer({ dest: 'uploads/'})

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


    routes(){
        this.app.use(this.depositoPath, depositoRoutes); 
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }


}


export default Server;
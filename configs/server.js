'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import { dbConnection } from './mongo.js';
import productRoutes from '../src/products/products.routes.js';  
import servicesRoutes from '../src/services/services.routes.js';  

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.productPath = '/Bank/v1/products';  // Define la ruta base para productos
        this.servicesPath = '/Bank/v1/services';  // Define la ruta base para servicios

        this.upload = multer({ dest: 'uploads/' });

        this.middlewares();
        this.conectarDB();
        this.routes();
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

    routes() {
        this.app.use(this.productPath, productRoutes);  // Usa las rutas de productos
        this.app.use(this.servicesPath, servicesRoutes); // Usa las rutas de servicios
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

export default Server;

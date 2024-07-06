import { resolve } from 'path';

import './src/database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import Customers from './src/routes/Customers';
import Products from './src/routes/Products';
import Carts from './src/routes/Carts';
import Orders from './src/routes/Orders';
import Images from './src/routes/Images';
import Token from './src/routes/Token';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet({}));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      '/images/',
      express.static(resolve(__dirname, 'uploads', 'images')),
    );
  }

  routes() {
    this.app.use('/customers', Customers);
    this.app.use('/carts', Carts);
    this.app.use('/orders', Orders);
    this.app.use('/products', Products);
    this.app.use('/token', Token);
    this.app.use('/images', Images);
  }
}

export default new App().app;

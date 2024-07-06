import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import Customer from '../models/Customer';
import Product from '../models/Product';
import Cart from '../models/Cart';
import Order from '../models/Order';
import Image from '../models/Image';

const models = [Customer, Product, Cart, Order, Image];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);

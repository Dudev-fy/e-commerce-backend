import { Sequelize, Model } from 'sequelize';

import Image from './Image';
import Order from './Order';
import Cart from './Cart';

export default class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        value: Sequelize.DOUBLE,
      },
      {
        sequelize,
        modelName: 'Product',
      },
    );
    return this;
  }

  static associate() {
    this.hasMany(Image, {
      foreignKey: {
        name: 'productId',
      },
    });
    this.hasMany(Order, {
      foreignKey: {
        name: 'productId',
      },
    });
    this.hasMany(Cart, {
      foreignKey: {
        name: 'productId',
      },
    });
  }
}

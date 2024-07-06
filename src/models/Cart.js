import { Sequelize, Model } from 'sequelize';

import Product from './Product';
import Customer from './Customer';

export default class Cart extends Model {
  static init(sequelize) {
    super.init(
      {
        productId: Sequelize.INTEGER,
        quantity: Sequelize.INTEGER,
        customerId: Sequelize.INTEGER,
      },
      {
        sequelize,
        modelName: 'Cart',
      },
    );
    return this;
  }

  static associate() {
    this.belongsTo(Product, {
      foreignKey: {
        name: 'productId',
      },
    });
    this.belongsTo(Customer, {
      foreignKey: {
        name: 'customerId',
      },
    });
  }
}

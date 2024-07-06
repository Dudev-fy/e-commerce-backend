import { Sequelize, Model } from 'sequelize';

import Product from './Product';
import Customer from './Customer';

export default class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        customerId: Sequelize.INTEGER,
        productId: Sequelize.INTEGER,
        quantity: Sequelize.INTEGER,
        totalPurchase: Sequelize.FLOAT,
      },
      {
        sequelize,
        modelName: 'Order',
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

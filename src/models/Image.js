import { Sequelize, Model } from 'sequelize';
import urlConfig from '../config/urlConfig';

import Product from './Product';

export default class Image extends Model {
  static init(sequelize) {
    super.init(
      {
        fileName: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Field cannot be empty',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${urlConfig.url}/images/${this.getDataValue('fileName')}`;
          },
        },
        productId: {
          type: Sequelize.INTEGER,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Field cannot be empty',
            },
          },
        },
      },
      {
        sequelize,
        modelName: 'Image',
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
  }
}

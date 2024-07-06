import { Sequelize, Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

import Order from './Order';
import Cart from './Cart';

export default class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        firstName: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Field name must have between 3 and 255 characters',
            },
          },
        },
        lastName: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Field last name must have between 3 and 255 characters',
            },
          },
        },
        cpf: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [11, 11],
              msg: 'Field CPF must contain 11 characters',
            },
            isNumeric(value) {
              if (!/^\d+$/.test(value)) {
                throw new Error('CPF must contain only numbers');
              }
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            isEmail: {
              msg: 'Email invalid',
            },
          },
        },
        password_hash: Sequelize.STRING,
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [12, 50],
              msg: 'Password must have between 12 and 50 characters',
            },
            isComplexEnough(value) {
              if (!/[A-Z]/.test(value)) {
                throw new Error(
                  'Password must have at least one uppercase letter',
                );
              }
              if (!/[0-9]/.test(value)) {
                throw new Error('Password must have at least one number');
              }
              if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                throw new Error(
                  'password must have at least one special character',
                );
              }
            },
          },
        },
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (customer) => {
      customer.password_hash = await bcryptjs.hash(customer.password, 8);
    });
    return this;
  }

  static associate() {
    this.hasMany(Order, {
      foreignKey: {
        name: 'customerId',
      },
    });
    this.hasMany(Cart, {
      foreignKey: {
        name: 'customerId',
      },
    });
  }
}

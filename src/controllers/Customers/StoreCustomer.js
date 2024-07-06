import Customer from '../../models/Customer';
import { CustomerService } from '../../services/customer';
import { ValidationError } from 'sequelize';

class StoreController {
  async index(req, res) {
    try {
      const { firstName, lastName, cpf, email, password } = req.body;
      const customer = new CustomerService(firstName, lastName, cpf);

      const newCustomer = await Customer.create({
        firstName: customer.firstName,
        lastName: customer.lastName,
        cpf: customer.cpf,
        email,
        password,
      });

      res.send(newCustomer);
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorMessages = error.errors.map((err) => err.message);
        console.error('Validation errors:', errorMessages);
        res.status(400).json({ errors: errorMessages });
      } else {
        console.error('Failed to create user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

export default new StoreController();

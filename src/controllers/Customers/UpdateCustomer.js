import Customer from '../../models/Customer';

class UpdateController {
  async updateCustomer(req, res) {
    try {
      const { id } = req.body;
      const { newFirstName, newLastName } = req.body;

      if (newFirstName !== null && newLastName !== null) {
        const updatedCustomer = await Customer.update(
          { firstName: newFirstName, lastName: newLastName },
          {
            where: {
              id,
            },
          },
        );
        res.json(updatedCustomer);
      } else {
        if (newFirstName !== null) {
          const updatedCustomer = await Customer.update(
            { firstName: newFirstName },
            {
              where: {
                id,
              },
            },
          );
          res.json(updatedCustomer);
        } else {
          if (newLastName !== null) {
            const updatedCustomer = await Customer.update(
              { lastName: newLastName },
              {
                where: {
                  id,
                },
              },
            );
            res.json(updatedCustomer);
          }
        }
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new UpdateController();

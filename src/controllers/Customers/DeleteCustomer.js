import Customer from '../../models/Customer';

class DeleteCustomer {
  async deleteCustomer(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }

      const customer = await Customer.findByPk(id);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      const deletedCustomer = await Customer.destroy({
        where: {
          id,
        },
      });

      if (deletedCustomer) {
        return res.json({ message: 'Customer deleted successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to delete customer' });
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new DeleteCustomer();

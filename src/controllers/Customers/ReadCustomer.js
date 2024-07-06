import Customer from '../../models/Customer';

class ReadController {
  async show(req, res) {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }

      const customer = await Customer.findByPk(id);

      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      return res.json(customer);
    } catch (error) {
      console.error('Error reading customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ReadController();

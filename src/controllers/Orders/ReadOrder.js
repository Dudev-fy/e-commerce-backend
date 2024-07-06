import Order from '../../models/Order';
import Image from '../../models/Image';
import Product from '../../models/Product';

class ReadOrder {
  async readOrder(req, res) {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Customer ID is required' });
      }

      const orders = await Order.findAll({
        where: {
          customerid: id,
        },
        include: [
          {
            model: Product,
            include: [Image],
            attributes: ['id', 'name', 'value'],
          },
        ],
        attributes: ['quantity', 'totalPurchase', 'created_at'],
        order: [['id', 'DESC']],
      });

      if (orders.length === 0) {
        return res
          .status(404)
          .json({ error: 'No orders found for this customer' });
      }

      res.json(orders);
    } catch (error) {
      console.error('Error reading orders:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ReadOrder();

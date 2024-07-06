import Order from '../../models/Order';

class DeleteOrder {
  async deleteOrder(req, res) {
    try {
      const { id } = req.body;
      const { productId } = req.params;

      if (!id || !productId) {
        return res
          .status(400)
          .json({ error: 'Customer ID and Product ID are required' });
      }

      const order = await Order.findOne({
        where: {
          customerId: id,
          productId,
        },
      });

      if (!order) {
        return res
          .status(404)
          .json({ error: 'Order not found for this customer' });
      }

      const deletedOrder = await Order.destroy({
        where: {
          customerId: id,
          productId,
        },
      });

      if (deletedOrder) {
        return res.json({ message: 'Order deleted successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to delete order' });
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new DeleteOrder();

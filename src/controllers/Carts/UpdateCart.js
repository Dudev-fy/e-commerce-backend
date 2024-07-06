import Cart from '../../models/Cart';

class UpdateController {
  async updateCart(req, res) {
    try {
      const { id } = req.body;
      const { productId, quantity } = req.params;

      if (!id || !productId || !quantity) {
        return res.status(400).json({
          error: 'Customer ID, Product ID, and Quantity are required',
        });
      }

      const [updatedRows] = await Cart.update(
        { quantity },
        {
          where: {
            customerId: id,
            productId,
          },
        },
      );

      if (updatedRows > 0) {
        return res.json({ message: 'Cart item updated successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to update cart item' });
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new UpdateController();

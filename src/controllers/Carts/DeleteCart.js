import Cart from '../../models/Cart';

class DeleteController {
  async deleteCart(req, res) {
    try {
      const { id } = req.body;
      const { productId } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Customer ID are required' });
      }

      if (!productId) {
        const deletedCarts = await Cart.destroy({
          where: {
            customerId: id,
          },
        });

        if (deletedCarts) {
          return res.json({ message: 'Shopping cart empty' });
        } else {
          return res
            .status(500)
            .json({ error: 'Failed to delete shopping cart' });
        }
      }

      const deletedCart = await Cart.destroy({
        where: {
          customerId: id,
          productId,
        },
      });

      if (deletedCart) {
        return res.json({ message: 'Cart item deleted successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to delete cart item' });
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new DeleteController();

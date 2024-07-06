import Cart from '../../models/Cart';
import { ShoppingCartService } from '../../services/shoppingCart';
import { NoDiscountService } from '../../services/discounts/noDiscount';
import Product from '../../models/Product';
import { ProductService } from '../../services/product';

class StoreController {
  async addItemToCart(req, res) {
    try {
      const { id } = req.body;
      const { quantity, productId } = req.params;

      if (!id || !productId || !quantity) {
        return res.status(400).json({
          error: 'Customer ID, Product ID, and Quantity are required',
        });
      }

      const discount = new NoDiscountService();
      const cart = new ShoppingCartService(discount);

      const product = await Product.findByPk(productId);

      if (!productId) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const existingCart = await Cart.findOne({
        attributes: ['quantity'],
        where: {
          customerId: id,
          productId,
        },
      });

      if (existingCart) {
        const parsedQuantity = parseInt(quantity);
        const currentQuantity = parseInt(existingCart.dataValues.quantity);
        const newQuantity = currentQuantity + parsedQuantity;
        const [updatedRows] = await Cart.update(
          { quantity: newQuantity },
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
      }

      const newItem = [];

      const newProduct = new ProductService(
        product.id,
        product.name,
        product.value,
        quantity,
      );

      newItem.push(newProduct);
      cart.addItems(newItem);
      const newCarts = [];

      for (const item of cart.items) {
        const newCart = await Cart.create({
          productId: item.id,
          quantity: item.quantity,
          customerId: id,
        });

        newCarts.push(newCart);
      }
      res.status(200).json(newCarts);
    } catch (error) {
      console.error('Error updating cart item:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new StoreController();

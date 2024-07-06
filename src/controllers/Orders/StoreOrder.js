import Cart from '../../models/Cart';
import Order from '../../models/Order';
import Product from '../../models/Product';
import { ShoppingCartService } from '../../services/shoppingCart';
import { NoDiscountService } from '../../services/discounts/noDiscount';

class StoreController {
  async storeOrder(req, res) {
    try {
      const { id } = req.body;
      console.log('ID:', id);

      if (!id) {
        return res.status(400).json({ error: 'Customer ID is required' });
      }

      const cartItems = await Cart.findAll({
        where: {
          customerId: id,
        },
        include: [
          {
            model: Product,
            attributes: ['id', 'name', 'value'],
          },
        ],
        attributes: ['quantity'],
      });

      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'No items on shopping cart' });
      }

      const newCartItems = [];

      for (const item of cartItems) {
        const items = {
          id: item.Product.id,
          name: item.Product.name,
          value: item.Product.value,
          quantity: item.quantity,
        };
        newCartItems.push(items);
      }

      const discount = new NoDiscountService();
      const shoppingCart = new ShoppingCartService(discount);

      shoppingCart.addItems(newCartItems);
      const newOrders = [];

      for (const item of newCartItems) {
        const totalPurchase = shoppingCart.singleItemPrice(item);
        const newOrder = await Order.create({
          customerId: id,
          productId: item.id,
          quantity: item.quantity,
          totalPurchase: totalPurchase,
        });
        newOrders.push(newOrder);
      }

      res.json(newOrders);
    } catch (error) {
      console.error('Error reading orders:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new StoreController();

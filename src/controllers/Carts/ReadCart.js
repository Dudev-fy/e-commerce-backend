import Cart from '../../models/Cart';
import Product from '../../models/Product';
import Image from '../../models/Image';
import { NoDiscountService } from '../../services/discounts/noDiscount';
import { ShoppingCartService } from '../../services/shoppingCart';

class ReadController {
  async getCartDetails(req, res) {
    try {
      const { id } = req.body;

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
            include: [Image],
            attributes: ['id', 'name', 'value'],
          },
        ],
        attributes: ['quantity'],
        order: [['id', 'DESC']],
      });

      if (cartItems.length === 0) {
        return res.status(404).json({ error: 'No items on shopping cart' });
      }

      const newCartItems = [];
      const newImages = [];

      for (const item of cartItems) {
        for (const image of item.Product.Images) {
          const newImage = image.url;
          newImages.push(newImage);
        }

        const newItem = {
          id: item.Product.id,
          name: item.Product.name,
          value: item.Product.value,
          quantity: item.quantity,
          imagesUrl: newImages,
        };
        newCartItems.push(newItem);
      }

      const discount = new NoDiscountService();
      const shoppingCart = new ShoppingCartService(discount);

      shoppingCart.addItems(newCartItems);
      const totalPurchase = shoppingCart.totalAfterDiscount().toFixed(2);
      newCartItems.push({ totalPurchase });

      res.json(newCartItems);
    } catch (error) {
      console.error('Error reading cart item:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ReadController();

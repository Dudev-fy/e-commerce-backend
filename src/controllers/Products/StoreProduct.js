import Product from '../../models/Product';
import { ProductService } from '../../services/product';

class StoreController {
  async store(req, res) {
    try {
      const { name, value } = req.body;

      if (!name || !value) {
        return res.status(400).json({ error: 'Name and value are required' });
      }

      const product = new ProductService(null, name, value, null);

      const newProduct = await Product.create({
        name: product.name,
        value: product.value,
      });

      res.json(newProduct);
    } catch (error) {
      console.error('Error storing product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new StoreController();

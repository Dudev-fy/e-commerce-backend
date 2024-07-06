import Product from '../../models/Product';
import Image from '../../models/Image';

class ReadOneProduct {
  async readProduct(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
      }

      const product = await Product.findByPk(id, {
        attributes: ['id', 'name', 'value'],
        order: [['id', 'DESC']],
        include: {
          model: Image,
          attributes: ['url', 'fileName'],
        },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      console.error('Error reading one product:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ReadOneProduct();

import Product from '../../models/Product';
import Image from '../../models/Image';

class ReadProduct {
  async readProduct(req, res) {
    try {
      const products = await Product.findAll({
        attributes: ['id', 'name', 'value'],
        order: [['id', 'DESC']],
        include: {
          model: Image,
          attributes: ['url', 'fileName'],
        },
      });

      res.json(products);
    } catch (error) {
      console.error('Error reading products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ReadProduct();

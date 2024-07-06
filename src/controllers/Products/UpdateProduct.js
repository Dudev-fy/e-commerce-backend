import Product from '../../models/Product';

class UpdateProduct {
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { value } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
      }

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const updatedProduct = await Product.update(
        { value },
        {
          where: {
            id,
          },
        },
      );

      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new UpdateProduct();

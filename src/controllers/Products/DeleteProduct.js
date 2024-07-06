import Product from '../../models/Product';

class DeleteProduct {
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
      }

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const deletedProduct = await Product.destroy({
        where: {
          id,
        },
      });

      if (deletedProduct) {
        return res.json({ message: 'Product deleted successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to delete product' });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new DeleteProduct();

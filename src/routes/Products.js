import { Router } from 'express';
import StoreProduct from '../controllers/Products/StoreProduct';
import ReadProduct from '../controllers/Products/ReadProduct';
import UpdateProduct from '../controllers/Products/UpdateProduct';
import DeleteProduct from '../controllers/Products/DeleteProduct';
import ReadOneProduct from '../controllers/Products/ReadOneProduct';

const router = new Router();

router.post('/', StoreProduct.store);
router.get('/', ReadProduct.readProduct);
router.get('/unique/:id', ReadOneProduct.readProduct);
router.put('/:id', UpdateProduct.updateProduct);
router.delete('/:id', DeleteProduct.deleteProduct);

export default router;

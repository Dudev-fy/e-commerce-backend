import { Router } from 'express';
import StoreCart from '../controllers/Carts/StoreCart';
import ReadCart from '../controllers/Carts/ReadCart';
import UpdateCart from '../controllers/Carts/UpdateCart';
import DeleteCart from '../controllers/Carts/DeleteCart';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/:quantity/:productId/', loginRequired, StoreCart.addItemToCart);
router.get('/', loginRequired, ReadCart.getCartDetails);
router.put('/:productId/:quantity', loginRequired, UpdateCart.updateCart);
router.delete('/:productId?', loginRequired, DeleteCart.deleteCart);

export default router;

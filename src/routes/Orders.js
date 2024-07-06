import { Router } from 'express';
import StoreOrder from '../controllers/Orders/StoreOrder';
import ReadOrder from '../controllers/Orders/ReadOrder';
import DeleteOrder from '../controllers/Orders/DeleteOrder';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, StoreOrder.storeOrder);
router.get('/', loginRequired, ReadOrder.readOrder);
router.delete('/:productId', loginRequired, DeleteOrder.deleteOrder);

export default router;

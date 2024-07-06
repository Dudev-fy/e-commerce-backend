import { Router } from 'express';
import StoreCustomer from '../controllers/Customers/StoreCustomer';
import ReadCustomer from '../controllers/Customers/ReadCustomer';
import UpdateCustomer from '../controllers/Customers/UpdateCustomer';
import DeleteCustomer from '../controllers/Customers/DeleteCustomer';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', StoreCustomer.index);
router.get('/', loginRequired, ReadCustomer.show);
router.delete('/:id', DeleteCustomer.deleteCustomer);
router.put('/', loginRequired, UpdateCustomer.updateCustomer);

export default router;

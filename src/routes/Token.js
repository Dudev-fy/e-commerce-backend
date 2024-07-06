import { Router } from 'express';
import TokenController from '../controllers/TokenController';

const router = new Router();

router.post('/', TokenController.storeToken);

export default router;

import { Router } from 'express';
import ImageController from '../controllers/ImageController';

const router = new Router();

router.post('/', ImageController.storeImage);

export default router;

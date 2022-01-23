import {Router} from 'express';


import { isAdmin, verifyToken } from '../middleware/authJwt';
import { activeProductbyId, addProduct, getAllProduct, getProductById, updateProductById } from '../controllers/product.controller';
import { verifyIdProduct } from '../middleware/verifyId';

const router=Router();



router.get('/:id',[verifyToken,verifyIdProduct],getProductById);
router.get('/',[verifyToken],getAllProduct);
router.post('/',[verifyToken,isAdmin],addProduct);
router.post('/:id',[verifyToken,isAdmin,verifyIdProduct],activeProductbyId);
router.put('/:id',[verifyToken,isAdmin,verifyIdProduct],updateProductById);


export default router;




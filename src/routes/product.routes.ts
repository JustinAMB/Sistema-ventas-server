import {Router} from 'express';


import { isAdmin, verifyToken } from '../middleware/authJwt';
import { activeProductbyId, addProduct, getAllProduct, getProductById, updateProductById } from '../controllers/product.controller';

const router=Router();



router.get('/:id',[verifyToken],getProductById);
router.get('/',[verifyToken],getAllProduct);
router.post('/',[verifyToken,isAdmin],addProduct);
router.post('/:id',[verifyToken,isAdmin],activeProductbyId);
router.put('/:id',[verifyToken,isAdmin],updateProductById);


export default router;




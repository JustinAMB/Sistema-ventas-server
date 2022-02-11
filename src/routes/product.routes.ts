import {Router} from 'express';


import { isAdmin, verifyToken } from '../middleware/authJwt';
import { activeProductbyId, addProduct, getAllProduct, getProductById, searchInventaryByTerm, updateProductById } from '../controllers/product.controller';
import { verifyIdProduct } from '../middleware/verifyId';
import { barcodeValidator } from '../middleware/unique';

const router=Router();



router.get('/:id',[verifyToken,verifyIdProduct],getProductById);
router.get('/',[verifyToken],getAllProduct);
router.get('/searchInventary/',[verifyToken],searchInventaryByTerm);
router.post('/',[verifyToken,isAdmin,barcodeValidator],addProduct);
router.post('/:id',[verifyToken,isAdmin,verifyIdProduct],activeProductbyId);
router.put('/:id',[verifyToken,isAdmin,verifyIdProduct],updateProductById);


export default router;




import {Router} from 'express';
import { addCategory, updateCategoryById } from "./../controllers/category.controller";
import { getCategoryById ,getAllCategory } from '../controllers/category.controller';
import { isAdmin, verifyToken } from '../middleware/authJwt';

const router=Router();



router.get('/:id',[verifyToken,isAdmin],getCategoryById);
router.get('/',[verifyToken,isAdmin],getAllCategory);
router.post('/',[verifyToken,isAdmin],addCategory);
router.put('/:id',[verifyToken,isAdmin],updateCategoryById);


export default router;










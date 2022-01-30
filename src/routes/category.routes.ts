import {Router} from 'express';

import { 
    getCategoryById ,
    getAllCategory,
    addCategory, 
    updateCategoryById ,
    activeCategoryById
} from '../controllers/category.controller';
import { isAdmin, verifyToken } from '../middleware/authJwt';
import { verifyIdCategory } from '../middleware/verifyId';

const router=Router();



router.get('/:id',[verifyToken,isAdmin,verifyIdCategory],getCategoryById);
router.get('/',[verifyToken,isAdmin],getAllCategory);
router.post('/',[verifyToken,isAdmin],addCategory);
router.put('/:id',[verifyToken,isAdmin,verifyIdCategory],updateCategoryById);
router.put('/active/:id',[verifyToken,isAdmin,verifyIdCategory],activeCategoryById);


export default router;










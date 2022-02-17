import {Router} from 'express';

import {  verifyToken } from '../middleware/authJwt';
import { addSell, getSellById, getSellsByDay } from '../controllers/sell.controller';
import { verifyEmailBySell } from '../middleware/verifyId';

const router=Router();


router.post('/:kind',[verifyToken,verifyEmailBySell],addSell);
router.get('/sellsDay/',[verifyToken],getSellsByDay);
router.get('/:id',[verifyToken],getSellById);




export default router;

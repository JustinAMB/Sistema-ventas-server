import {Router} from 'express';

import {  verifyToken } from '../middleware/authJwt';
import { addSell, getSellById } from '../controllers/sell.controller';
import { verifyEmailBySell } from '../middleware/verifyId';

const router=Router();


router.post('/:kind',[verifyToken,verifyEmailBySell],addSell);
router.get('/:id',[verifyToken],getSellById);



export default router;

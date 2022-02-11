import {Router} from 'express';

import {  verifyToken } from '../middleware/authJwt';
import { addSell } from '../controllers/sell.controller';
import { verifyEmailBySell } from '../middleware/verifyId';

const router=Router();


router.post('/:kind',[verifyToken,verifyEmailBySell],addSell);



export default router;

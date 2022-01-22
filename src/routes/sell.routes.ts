import {Router} from 'express';

import {  verifyToken } from '../middleware/authJwt';
import { addSell } from '../controllers/sell.controller';

const router=Router();




router.post('/',[verifyToken],addSell);



export default router;

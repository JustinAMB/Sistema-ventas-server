import {Router} from 'express';
import { getReports } from '../controllers/report.controller';

import {  verifyToken } from '../middleware/authJwt';
import { emailValidator } from '../middleware/unique';


const router=Router();

router.get('/',[verifyToken],getReports);


export default router;
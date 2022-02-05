import {Router} from 'express';
import {fileUpload} from '../controllers/upload.controller';

import  expressFileUpload from'express-fileupload';
import { verifyToken } from '../middleware/authJwt';


const router=Router();


router.use(expressFileUpload());



router.put('/:tipo/:id',[verifyToken], fileUpload);



export default router;
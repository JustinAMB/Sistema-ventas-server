import {Router} from 'express';
import {fileUpload, getImage} from '../controllers/upload.controller';

import  expressFileUpload from'express-fileupload';
import { verifyToken } from '../middleware/authJwt';


const router=Router();


router.use(expressFileUpload());



router.put('/:tipo/:id',[verifyToken], fileUpload);
router.get('/:tipo/:foto', getImage);



export default router;
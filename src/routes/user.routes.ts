import {Router} from 'express';
import { singIn } from '../controllers/user.controller';


const router=Router();




router.post('/signIn',singIn);



export default router;





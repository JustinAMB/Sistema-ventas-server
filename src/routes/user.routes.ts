import {Router} from 'express';
import { activeUserById, addUser, getAllUsers, getUserById, singIn, updateUserById } from '../controllers/user.controller';

import {  isAdmin, verifyToken } from '../middleware/authJwt';
import { verifyIdUser } from '../middleware/verifyId';
const router=Router();




router.post('/signIn',singIn);

router.post('/',[verifyToken,isAdmin],addUser);
router.put('/:id',[verifyToken,isAdmin,verifyIdUser],updateUserById);
router.get('/',[verifyToken,isAdmin],getAllUsers);
router.get('/:id',[verifyToken,isAdmin,verifyIdUser],getUserById);
router.put('/active/:id',[verifyToken,isAdmin,verifyIdUser],activeUserById);

export default router;





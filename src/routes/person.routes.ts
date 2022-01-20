import {Router} from 'express';
import { addPerson, getAllPerson, getPersonById, updatePersonById } from '../controllers/person.controller';
import { isAdmin, verifyToken } from '../middleware/authJwt';

const router=Router();

router.get('/:id',[verifyToken,isAdmin],getPersonById);
router.get('/:kind',[verifyToken,isAdmin],getAllPerson);
router.post('/:kind',[verifyToken,isAdmin],addPerson);
router.put('/:id',[verifyToken,isAdmin],updatePersonById);


export default router;
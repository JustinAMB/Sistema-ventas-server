import {Router} from 'express';
import { activePersonById, addPerson, getAllPerson, getPersonById, updatePersonById } from '../controllers/person.controller';
import { isAdmin, verifyToken } from '../middleware/authJwt';
import { verifyIdPerson } from '../middleware/verifyId';

const router=Router();

router.get('/:id',[verifyToken,isAdmin,verifyIdPerson],getPersonById);
router.get('/getPersons/:kind',[verifyToken,isAdmin],getAllPerson);
router.post('/:kind',[verifyToken,isAdmin],addPerson);
router.put('/:id',[verifyToken,isAdmin,verifyIdPerson],updatePersonById);
router.put('/active/:id',[verifyToken,isAdmin,verifyIdPerson],activePersonById);

export default router;
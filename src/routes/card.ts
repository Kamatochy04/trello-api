import express from 'express';
import { getAll, getOne, deleted, create, updata } from '../services/boardService';

const router = express.Router();

router.post('/create', create);
router.get('/getAll', getAll);
router.get('/getOne/:id', getOne);
router.put('/updata/:id', updata);
router.delete('/deleted/:id', deleted);

export default router;

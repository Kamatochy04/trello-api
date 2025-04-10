import express from 'express';

import { getOne, getAll, updata, deleted, create } from '../services/boardService';
import { checkRole } from '../middleware/checkRole';

const router = express.Router();

router.post('/create', checkRole, create);
router.delete('/delet', checkRole, deleted);
router.put('/updata', checkRole, updata);
router.get('/getAll', checkRole, getAll);
router.get('/get/:id', checkRole, getOne);

export default router;

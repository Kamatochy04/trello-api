import express from 'express';
import { login, register } from '../services/userService';
import { IRegisterRequest } from '../types/user.type';

const router = express.Router();

router.post('/register', (req: IRegisterRequest, res) => {
  register(req, res);
});
router.post('/login', (req, res) => {
  login(req, res);
});

export default router;

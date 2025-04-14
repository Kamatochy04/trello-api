import { Request, Response } from 'express';
import { UserRepository } from '../Repository/userRepository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { password, email } = req.body;

    const user = await UserRepository.getByEmail(email);

    if (!user) {
      res.send({ message: 'User not found' });
      return;
    }

    const isCorrectPassword = bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      res.send({ message: 'Password is not correct' });
      return;
    }

    const sesretKey = process.env.JWT_SECRET_KEY || 'SECRET_KEY';
    const token = jwt.sign({ id: user.id, role: user.role }, sesretKey, { expiresIn: '2d' });

    res.send({ token });
  } catch (err) {
    console.log(err);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, userName, role } = req.body;

    if (!email) {
      res.status(400).send({ message: 'Email is empty' });
      return;
    }
    if (!password) {
      res.status(400).send({ message: 'Password is empty' });
      return;
    }

    const isUserExist = await UserRepository.getByEmail(email);
    if (isUserExist) {
      res.status(400).send({ message: 'A user with the same email already exists' });
      return;
    }

    const id = new Date().getSeconds();
    const sesretKey = process.env.JWT_SECRET_KEY || 'SECRET_KEY';
    const token = jwt.sign({ id, role }, sesretKey, { expiresIn: '2d' });

    await UserRepository.savePersonalData(email, password, userName, role, id);
    res.status(200).send({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

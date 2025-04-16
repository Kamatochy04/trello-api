import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { ILoginRequest, IRegisterRequest, IUserResponse, UserRole } from '../types/user.type';

const prisma = new PrismaClient();

export const login = async (
  req: ILoginRequest,
  res: Response<IUserResponse | { message: string }>
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.hash_password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.user_name,
        role: user.role as UserRole,
        token: jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '30d' }),
      });
    } else {
      return res.status(400).json({ message: 'Неверно введен логин или пароль' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

export const register = async (
  req: IRegisterRequest,
  res: Response<IUserResponse | { message: string }>
) => {
  try {
    const { email, password, name, role = 'USER' } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' });
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (registeredUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        user_name: name,
        hash_password: hashedPassword,
        role,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.user_name,
        role: user.role as UserRole,
        token: jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '30d' }),
      });
    } else {
      return res.status(400).json({ message: 'Не удалось создать пользователя' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

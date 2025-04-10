import { Request, Response } from 'express';
import { BoardRepository } from '../Repository/boardRepository';
import { BoardRequest } from '../types/board.type';

export const create = async (req: BoardRequest, res: Response) => {
  try {
    const { name, color, description } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.send({ message: 'Not found user id' });
      return;
    }

    const today = new Date();
    const createdAt = [
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
      String(today.getFullYear()).slice(-2),
    ].join('.');

    BoardRepository.addBoard(userId, name, color, description, createdAt);
  } catch (err) {
    console.log(err);
  }

  res.send('create');
};

export const deleted = async (req: Request, res: Response) => {
  res.send('deleted');
};

export const updata = async (req: Request, res: Response) => {
  res.send('updata');
};

export const getOne = async (req: Request, res: Response) => {
  res.send('getOne');
};

export const getAll = async (req: Request, res: Response) => {
  res.send('getAll');
};

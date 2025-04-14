import { Request, Response } from 'express';

import { BoardRequest } from '../types/board.type';
import { BoardRepository } from '../Repository/boardRepository';

const boardRepository = new BoardRepository();

export const create = async (req: BoardRequest, res: Response) => {
  boardRepository.create({
    id: 23,
    name: 'Name',
    color: 'red',
    description: 'Lorem',
    createdAt: 'now',
  });
  res.send({ message: 'Hello 2' });
  return;
};

export const delet = async (req: Request, res: Response) => {
  boardRepository.delete(12);
};

export const updata = async (req: Request, res: Response) => {
  res.send('updata');
};

export const getOne = async (req: Request, res: Response) => {
  const data = await boardRepository.getOne(12);
  console.log(data);
  res.send({ message: 'Ok' });
};

export const getAll = async (req: Request, res: Response) => {
  await boardRepository.getAll();
  res.send({ message: 'Ok' });
};

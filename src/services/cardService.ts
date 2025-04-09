import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  res.send("create");
};

export const deleted = async (req: Request, res: Response) => {
  res.send("deleted");
};

export const updata = async (req: Request, res: Response) => {
  res.send("updata");
};

export const getOne = async (req: Request, res: Response) => {
  res.send("getOne");
};

export const getAll = async (req: Request, res: Response) => {
  res.send("getAll");
};

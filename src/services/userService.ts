import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  res.send("User login");
};

export const register = async (req: Request, res: Response) => {
  res.send("User register");
};

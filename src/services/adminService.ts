import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  res.send("Admin login");
};

export const register = async (req: Request, res: Response) => {
  res.send("Admin register");
};

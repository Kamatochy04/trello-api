import { Request } from 'express';

export type UserRole = 'USER' | 'ADMIN';

export interface IRegisterRequest extends Request {
  body: {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
  };
}

export interface ILoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
export interface IUserResponse {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  token: string;
}

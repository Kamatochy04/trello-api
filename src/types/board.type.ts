import { Request } from 'express';
import { AuthenticatedRequest } from './authenticatedAdmin.type';

export type BoardType = {
  name: string;
  color: string;
  description?: string;
  createdAt?: string;
  id: number;
};

export interface BoardRequest extends Request, AuthenticatedRequest {
  body: BoardType;
}

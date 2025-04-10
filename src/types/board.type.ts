import { Request } from 'express';
import { AuthenticatedRequest } from './authenticatedAdmin.type';

export type BoardType = {
  name: string;
  color: string;
  description?: string;
  createdAt?: string;
};

export interface BoardRequest extends Request, AuthenticatedRequest {
  body: BoardType;
}

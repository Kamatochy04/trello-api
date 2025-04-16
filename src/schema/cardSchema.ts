import Joi from 'joi';
import { CardCreateInput, CardUpdateInput } from '../types/card.type';

export const cardCreateSchema = Joi.object<CardCreateInput>({
  name: Joi.string().required().min(3).max(100),
  description: Joi.string().required().max(500),
  estimate: Joi.number().integer().min(0).required(),
  status: Joi.string().valid('WAITING', 'IN_PROGRESS', 'COMPLETED').default('WAITING'),
  user_id: Joi.number().integer().required(),
  due_date: Joi.date().greater('now').required(),
  labels: Joi.array().items(Joi.string().min(1).max(50)).optional(),
});

export const cardUpdateSchema = Joi.object<CardUpdateInput>({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional(),
  estimate: Joi.number().integer().min(0).optional(),
  status: Joi.string().valid('WAITING', 'IN_PROGRESS', 'COMPLETED').optional(),
  due_date: Joi.date().greater('now').optional(),
  labels: Joi.array().items(Joi.string().min(1).max(50)).optional(),
});

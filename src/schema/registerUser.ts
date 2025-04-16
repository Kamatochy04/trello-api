import Joi from 'joi';

export const registerUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(3).max(30),
  userName: Joi.string().required().min(3).max(20),
});

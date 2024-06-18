import { z } from 'zod';

const createUserValidation = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'name must be string' }),
    email: z.string({ invalid_type_error: 'please give the valid email' }),
    password: z
      .string()
      .max(20, { message: 'password can not more than 20characters' }),
    address: z.string({ required_error: 'please give the address' }),
    phone: z.string({ required_error: 'please give the phone' }),
    role: z.enum(['user', 'admin']),
  }),
});

const userLoginvalidation = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});
export const uservalidation = {
  createUserValidation,
  userLoginvalidation,
};

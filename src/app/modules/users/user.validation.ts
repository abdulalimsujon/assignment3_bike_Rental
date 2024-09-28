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
  }),
});
const updateUserValidation = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'name must be string' }).optional(),
    email: z
      .string({ invalid_type_error: 'please give the valid email' })
      .optional(),
    password: z
      .string()
      .max(20, { message: 'password can not more than 20characters' })
      .optional(),
    address: z.string({ required_error: 'please give the address' }).optional(),
    phone: z.string({ required_error: 'please give the phone' }).optional(),
    role: z.enum(['user', 'admin']).optional(),
  }),
});

const userLoginvalidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});
export const uservalidation = {
  createUserValidation,
  userLoginvalidation,
  updateUserValidation,
};

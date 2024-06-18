import { z } from 'zod';
import { Types } from 'mongoose';

const rentalSchema = z.object({
  userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid userId',
  }),
  bikeId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid bikeId',
  }),
  startTime: z.string().datetime({ message: 'Invalid startTime format' }),
  returnTime: z.string().datetime({ message: 'Invalid returnTime format' }),
  totalCost: z.number({ invalid_type_error: 'totalCost must be a number' }),
  isReturned: z.boolean().optional().default(false),
});

const updateRentalSchema = z.object({
  userId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), { message: 'Invalid userId' })
    .optional(),
  bikeId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), { message: 'Invalid bikeId' })
    .optional(),
  startTime: z
    .string()
    .datetime({ message: 'Invalid startTime format' })
    .optional(),
  returnTime: z
    .string()
    .datetime({ message: 'Invalid returnTime format' })
    .optional()
    .nullable(),
  totalCost: z
    .number({ invalid_type_error: 'totalCost must be a number' })
    .optional(),
  isReturned: z.boolean().optional(),
});

export const bookingValidation = {
  updateRentalSchema,
  rentalSchema,
};

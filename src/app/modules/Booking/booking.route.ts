import express from 'express';
import { rentalController } from './booking.controller';
import validataRequest from '../../middleware/validateSchemaRequest';
import { bookingValidation } from './booking.validation';
import Auth from '../../middleware/auth';
const router = express.Router();

router.post(
  '/',
  Auth('admin', 'user'),
  validataRequest(bookingValidation.rentalSchema),
  rentalController.createRental,
);

router.put('/:id/return', Auth('admin'), rentalController.returnBike);

export const rentalRouter = router;

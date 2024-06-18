import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import { rentalService } from './booking.service';
import sendResponse from '../../utilities/sendResponse';
import { Bike } from '../Bike/bike.model';
import AppError from '../../Error/appError';

const createRental = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user.userId;
  payload.userId = userId;

  const isBikeExists = await Bike.findOne({
    _id: payload.bikeId,
    isAvailable: true,
  });

  if (!isBikeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'The bike is rented out');
  }

  const result = await rentalService.createRentalIntoDb(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});

export const rentalController = {
  createRental,
};

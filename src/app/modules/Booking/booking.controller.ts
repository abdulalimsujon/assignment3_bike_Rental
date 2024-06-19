import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import { rentalService } from './booking.service';
import sendResponse from '../../utilities/sendResponse';

const createRental = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await rentalService.createRentalIntoDb(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});

const returnBike = catchAsync(async (req, res) => {
  const rentalId = req.params.id;

  const result = await rentalService.returnBike(rentalId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});

export const rentalController = {
  createRental,
  returnBike,
};

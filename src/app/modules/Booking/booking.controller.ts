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
  const userId = req?.user?.userId;

  const result = await rentalService.returnBike(rentalId, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental returned  successfully',
    data: result,
  });
});

const getAllRentalById = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await rentalService.getAllRentals(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

export const rentalController = {
  createRental,
  returnBike,
  getAllRentalById,
};

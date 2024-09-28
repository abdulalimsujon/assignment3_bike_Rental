import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import { rentalService } from './booking.service';
import sendResponse from '../../utilities/sendResponse';

const createRental = catchAsync(async (req, res) => {
  const payload = req.body?.payload;
  const price = req.body.price;
  const userId = req.body.userId;

  const result = await rentalService.createRentalWithPayment(
    payload[0],
    price,
    userId,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});

const returnBike = catchAsync(async (req, res) => {
  const reqBody = req.body;
  const result = await rentalService.returnBike(reqBody);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental returned  successfully',
    data: result,
  });
});

const getAllRental = catchAsync(async (req, res) => {
  const result = await rentalService.getAllRentals();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

const getRentalByuserId = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await rentalService.getRentalByuserId(userId);

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
  getAllRental,
  getRentalByuserId,
};

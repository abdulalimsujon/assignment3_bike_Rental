import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { bikeService } from './bike.service';

const createBike = catchAsync(async (req, res) => {
  const reqbody = req.body;
  const result = await bikeService.createBikeIntoDb(reqbody);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike is added successfully',
    data: result,
  });
});
const getAllBike = catchAsync(async (req, res) => {
  const result = await bikeService.getAllbike();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const id = req.params.id;
  const reqBody = req.body;
  const result = await bikeService.updateBike(id, reqBody);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike updated successfully',
    data: result,
  });
});

export const bikeController = {
  createBike,
  updateBike,
  getAllBike,
};

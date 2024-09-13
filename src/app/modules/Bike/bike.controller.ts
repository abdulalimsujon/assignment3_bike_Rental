import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { bikeService } from './bike.service';
import { Express } from 'express';

const createBike = catchAsync(async (req, res) => {
  const data = req.body;
  const file = req.file;
  console.log('1', data);
  console.log('2', file);
  const result = await bikeService.createBikeIntoDb(
    data,
    file as Express.Multer.File,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike is added successfully',
    data: result,
  });
});

const getAllBikeQuery = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await bikeService.getBikeQuery(query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bikes retrieved successfully',
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

const deleteBike = catchAsync(async (req, res) => {
  const _id = req.params.id;

  const result = await bikeService.deleteBike(_id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'bike deleted successfully',
    data: result,
  });
});

const getSingleBike = catchAsync(async (req, res) => {
  const { bikeId } = req.params;

  const result = await bikeService.getSingleBikeFromDb(bikeId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'bike is retrived successfully',
    data: result,
  });
});

export const bikeController = {
  createBike,
  updateBike,
  getAllBikeQuery,
  getAllBike,
  getSingleBike,
  deleteBike,
};

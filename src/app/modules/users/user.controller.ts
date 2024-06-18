import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { userServices } from './user.service';

const getMe = catchAsync(async (req, res) => {
  const id = req.user.userId;
  const result = await userServices.getMe(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const id = req.user.userId;
  const reqbody = req.body;

  const result = await userServices.updateProfileIntoDb(id, reqbody);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const userController = {
  getMe,
  updateProfile,
};

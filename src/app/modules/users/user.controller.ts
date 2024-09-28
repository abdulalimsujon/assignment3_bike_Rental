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

const getAllUser = catchAsync(async (req, res) => {
  const result = await userServices.getAlluserFromDb();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All user retrived successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await userServices.deleteUserIntoDb(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user is deleted successdully',
    data: result,
  });
});

const ChangeUserRole = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const role = req.body.role;

  const result = await userServices.changeUserRoleIntoDb(userId, role);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user is deleted successdully',
    data: result,
  });
});

export const userController = {
  getMe,
  updateProfile,
  getAllUser,
  deleteUser,
  ChangeUserRole,
};

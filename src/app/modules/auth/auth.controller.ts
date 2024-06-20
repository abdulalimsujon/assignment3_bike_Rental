import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { userServices } from './auth.service';

const UserSignUp = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userServices.createUserIntoDb(payload);

  const { _id, name, email, phone, address, role, createdAt, updatedAt } =
    result;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: {
      _id,
      name,
      email,
      phone,
      address,
      role,
      createdAt,
      updatedAt,
    },
  });
});

const userLogin = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userServices.userLogin(payload);

  const { _id, name, email, phone, address, role } = result.userData;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: result.token,
    data: { _id, name, email, phone, address, role },
  });
});

export const authControllers = {
  UserSignUp,
  userLogin,
};

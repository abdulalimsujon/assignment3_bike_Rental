import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { userServices } from './auth.service';
import config from '../../config';
import { Express } from 'express';

const UserSignUp = catchAsync(async (req, res) => {
  const data = req.body;
  const file = req.file;

  const result = await userServices.createUserIntoDb(
    data,
    file as Express.Multer.File,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userServices.userLogin(payload);
  res.cookie('refreshToken', result.refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result,
  });
});

export const authControllers = {
  UserSignUp,
  userLogin,
};

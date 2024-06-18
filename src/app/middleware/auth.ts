/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../Error/appError';
import catchAsync from '../utilities/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/users/user.model';
import { TuserRole } from '../modules/users/user.interface';
import { NextFunction, Request, Response } from 'express';
import { getTokenFromBearer } from '../utilities/getTokenFromBearer';

const Auth = (...RequireRules: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = getTokenFromBearer(req.headers.authorization as string);

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize');
    }

    //if  the token is invalid

    const decode = jwt.verify(
      token,
      config.create_token_secrate as string,
    ) as JwtPayload;

    req.user = decode as JwtPayload;
    const { role, userId } = decode;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'this user is not found');
    }

    if (RequireRules && !RequireRules.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize');
    }

    next();
  });
};

export default Auth;

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
      throw new Error('You are not  authorize');
    }

    if (RequireRules && !RequireRules.includes(role)) {
      res.status(401).send({
        success: false,
        statusCode: 401,
        message: 'You have no access to this route',
      });
    }

    next();
  });
};

export default Auth;

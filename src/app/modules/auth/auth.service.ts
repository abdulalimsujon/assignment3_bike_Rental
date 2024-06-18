import httpStatus from 'http-status';
import AppError from '../../Error/appError';
import { Tuser, Tuserlogin } from '../users/user.interface';
import { User } from '../users/user.model';

import config from '../../config';
import { comparePasswords, createToken } from './auth.utils';

const createUserIntoDb = async (payload: Tuser) => {
  const result = await User.create(payload);

  return result;
};

const userLogin = async (payload: Tuserlogin) => {
  const userData = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user doesnot exist');
  }

  const isPasswordMatched = await comparePasswords(
    payload.password,
    userData.password,
  );

  if (!isPasswordMatched) {
    throw new Error('The password doest matched');
  }

  const userId = userData._id.toString();
  const token = createToken(
    { userId, role: userData.role },
    config.create_token_secrate as string,
    config.expires_token_time as string,
  );

  return {
    token,
    userData,
  };
};

export const userServices = {
  createUserIntoDb,
  userLogin,
};

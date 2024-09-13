import httpStatus from 'http-status';
import AppError from '../../Error/appError';
import { Tuser, Tuserlogin } from '../users/user.interface';
import { User } from '../users/user.model';

import config from '../../config';
import { createToken, TtokenPayload } from './auth.utils';
import { comparePasswords } from '../../utilities/comparePassword';
import { sendImageToCloudinary } from '../../utilities/sendImageToCloudinary';
import { Express } from 'express';

const createUserIntoDb = async (
  data: Tuser,
  file: Express.Multer.File & { path?: string },
) => {
  if (file) {
    const imageName = `${Math.floor(100 + Math.random() * 900)}`;
    const path = file?.path;
    const { secure_url } = (await sendImageToCloudinary(imageName, path)) as {
      secure_url: string;
    };

    if (secure_url) {
      data.image = secure_url as string;
    }
  }

  const result = await User.create(data);

  return result;
};

const userLogin = async (data: Tuserlogin) => {
  const userData = await User.findOne({ email: data?.email }).select(
    '+password',
  );
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user doesnot exist');
  }

  const isPasswordMatched = await comparePasswords(
    data.password,
    userData.password,
  );

  if (!isPasswordMatched) {
    throw new Error('The password doest matched');
  }
  const userId = userData._id.toString();
  const payload = { userId, role: userData.role };

  const token = createToken(
    payload as TtokenPayload,
    config.create_token_secrate as string,
    config.expires_token_time as string,
  );
  const refreshToken = createToken(
    payload as TtokenPayload,
    config.create_token_secrate as string,
    config.expires_token_time as string,
  );

  return {
    refreshToken,
    token,
    payload,
  };
};

export const userServices = {
  createUserIntoDb,
  userLogin,
};

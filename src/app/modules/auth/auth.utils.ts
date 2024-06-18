/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../Error/appError';

export const createToken = (
  JwtPayload: { userId: string; role: string },
  secreate: string,
  expiresIn: string,
) => {
  return Jwt.sign(JwtPayload, config.create_token_secrate as string, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secreate: string) => {
  const decode = Jwt.verify(token, secreate) as JwtPayload;

  return decode;
};

export async function comparePasswords(
  plainTextPassword: string,
  hash: string,
): Promise<boolean> {
  try {
    const result = await bcrypt.compare(plainTextPassword, hash);
    return result;
  } catch (err) {
    throw new Error('Error comparing passwords');
  }
}

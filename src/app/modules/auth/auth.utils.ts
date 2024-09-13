/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

export type TtokenPayload = { userId: string; role: string };

export const createToken = (
  JwtPayload: TtokenPayload,
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

import { Response } from 'express';
import httpStatus from 'http-status';

const notifyUser = (
  res: Response,
  data: {
    success: boolean;
    statusCode: number;
    message: string;
  },
) => {
  res.status(httpStatus.UNAUTHORIZED).json({
    success: data?.success,
    statusCode: data?.statusCode,
    message: data?.message,
  });
};

export default notifyUser;

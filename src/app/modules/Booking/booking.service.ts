import httpStatus from 'http-status';
import AppError from '../../Error/appError';
import { Bike } from '../Bike/bike.model';
import Trental from './booking.interface';
import { Rental } from './booking.model';
import { startSession } from 'mongoose';
import { User } from '../users/user.model';

const createRentalIntoDb = async (payload: Trental) => {
  const isBikeExists = await Bike.findOne({
    _id: payload.bikeId,
    isAvailable: true,
  });

  if (!isBikeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'The bike is rented out');
  }

  const session = await startSession();
  try {
    session.startTransaction();
    const result = await Rental.create([payload], { session });

    await Bike.findByIdAndUpdate(
      { _id: payload.bikeId },
      { isAvailable: false },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create new rental',
    );
  }
};

const returnBike = async (rentalId: string) => {
  const rentalInfo = await Rental.findOne({ _id: rentalId });

  const data = {
    _id: rentalId,
    userId: rentalInfo?.userId,
    bikeId: rentalInfo?.bikeId,
    startTime: rentalInfo?.startTime,
    returnTime: new Date(Date.now()).toISOString(),
  };

  return data;
};

export const rentalService = {
  createRentalIntoDb,
  returnBike,
};

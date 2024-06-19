import httpStatus from 'http-status';
import AppError from '../../Error/appError';
import { Bike } from '../Bike/bike.model';
import Trental from './booking.interface';
import { Rental } from './booking.model';
import { startSession } from 'mongoose';
import calculateRentalCost from '../../utilities/getDuaration';

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

const returnBike = async (rentalId: string, userId: string) => {
  const rentalInfo = await Rental.findOne({ _id: rentalId });
  const bikeInfo = await Bike.findOne({ _id: rentalInfo?.bikeId });
  const start = new Date(rentalInfo?.startTime as Date).toISOString();
  const end = new Date(rentalInfo?.returnTime as Date).toISOString();

  const perHourCost = bikeInfo?.pricePerHour;
  const cost = calculateRentalCost(start, end, perHourCost as number);

  const data = {
    _id: rentalId,
    userId: userId,
    bikeId: rentalInfo?.bikeId,
    startTime: rentalInfo?.startTime,
    returnTime: rentalInfo?.returnTime,
    totalCost: cost,
    isReturned: true,
  };

  const result = await Rental.findOneAndUpdate({ _id: rentalId }, data, {
    new: true,
  });

  return result;
};

export const rentalService = {
  createRentalIntoDb,
  returnBike,
};

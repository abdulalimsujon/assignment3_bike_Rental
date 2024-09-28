/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../Error/appError';
import { Bike } from '../Bike/bike.model';
import { Rental } from './booking.model';
import mongoose, { startSession } from 'mongoose';
import calculateRentalCost from '../../utilities/getDuaration';
import Stripe from 'stripe';

// const createRentalIntoDb = async (payload: Trental) => {
//   const isBikeExists = await Bike.findOne({
//     _id: payload.bikeId,
//     isAvailable: true,
//   });

//   if (!isBikeExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'The bike is rented out');
//   }

//   const session = await startSession();
//   try {
//     session.startTransaction();
//     const result = await Rental.create([payload], { session });

//     await Bike.findByIdAndUpdate(
//       { _id: payload.bikeId },
//       { isAvailable: false },
//       { session },
//     );

//     await session.commitTransaction();
//     await session.endSession();

//     return result;
//   } catch (error) {
//     session.abortTransaction();
//     session.endSession();
//     throw new AppError(
//       httpStatus.INTERNAL_SERVER_ERROR,
//       'Failed to create new rental',
//     );
//   }
// };

const stripe = new Stripe(
  'sk_test_51Ls9jVGslqmvXzFIfLkJo8WVNwT0ToCyiB5v6qyrCADp9WcKBGWEi8XcJrkwl3vSknEw98189NLwHJverPRP3Hds00Gmer4TVQ',
  {},
);

const createRentalWithPayment = async (
  payload: { startTime: string; _id: string },
  price: number,
  userId: string,
) => {
  const session = await startSession();
  session.startTransaction();

  try {
    // Check if the bike is available for rent
    const isBikeExists = await Bike.findOne({
      _id: payload?._id,
      isAvailable: true,
    }).session(session);

    if (!isBikeExists) {
      throw new AppError(404, 'The bike is rented out');
    }

    const data = {
      startTime: payload.startTime,
      bikeId: payload._id,
      userId,
    };

    // Create a new rental record
    const rentalResult = await Rental.create([data], { session });

    // Update bike availability
    await Bike.findByIdAndUpdate(
      { _id: payload._id },
      { isAvailable: false },
      { session },
    );

    // Create payment intent via Stripe
    const amount = Math.round(price * 100); // Convert price to cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    // Commit transaction only if all steps succeeded
    await session.commitTransaction();
    await session.endSession();

    return { rentalResult, clientSecret: paymentIntent.client_secret };
  } catch (error: any) {
    // If anything fails, abort the transaction
    await session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
};

const returnBike = async (payload: {
  bikeId: string;
  startTime: string;
  returnTime: string;
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const rentalInfo = await Rental.findOne({ bikeId: payload.bikeId }).session(
      session,
    );

    const bikeInfo = await Bike.findOne({ _id: payload.bikeId }).session(
      session,
    );

    const start = payload?.startTime;
    const end = payload.returnTime;
    const perHourCost = bikeInfo?.pricePerHour;
    const cost = calculateRentalCost(start, end, perHourCost as number);

    const data = {
      bikeId: payload.bikeId,
      startTime: start,
      returnTime: end,
      totalCost: cost,
      isReturned: true,
    };

    // Update rental info
    const updatedRental = await Rental.findOneAndUpdate(
      { _id: rentalInfo?._id },
      data,
      { new: true, session },
    );

    // Update bike availability
    await Bike.findOneAndUpdate(
      { _id: rentalInfo?.bikeId },
      { isAvailable: true },
      { session },
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return updatedRental;
  } catch (error: any) {
    // If an error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();
    throw new Error(error); // Rethrow the error so it can be handled externally
  }
};

const getAllRentals = async () => {
  const result = await Rental.find({}).populate('bikeId'); // Populates the bike information
  return result;
};

const getRentalByuserId = async (userId: string) => {
  const result = await Rental.find({ userId }).populate({
    path: 'bikeId', // Populates the bikeId reference
    select: '-_id brand model pricePerHour name', // Specify fields to include from the populated document
  });

  return result;
};

export const rentalService = {
  //createRentalIntoDb,
  createRentalWithPayment,
  returnBike,
  getAllRentals,
  getRentalByuserId,
};

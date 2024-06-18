import Trental from './booking.interface';
import { Rental } from './booking.model';

const createRentalIntoDb = async (payload: Trental) => {
  const result = await Rental.create(payload);
  return result;
};

export const rentalService = {
  createRentalIntoDb,
};

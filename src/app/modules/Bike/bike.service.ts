import { Tbike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDb = async (payload: Tbike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllbike = async () => {
  const result = await Bike.find({});

  return result;
};

const deleteBike = async (_id: string) => {
  const isBikeExists = await Bike.findById(_id);

  if (!isBikeExists) {
    throw new Error('this is not valid bike id');
  }
  const result = await Bike.findByIdAndDelete(_id, {
    new: true,
  });
  return result;
};

const updateBike = async (_id: string, payload: Partial<Tbike>) => {
  const isBikeExists = await Bike.findById(_id);

  if (!isBikeExists) {
    throw new Error('this is not valid bike id');
  }
  const result = await Bike.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const bikeService = {
  createBikeIntoDb,
  getAllbike,
  deleteBike,
  updateBike,
};

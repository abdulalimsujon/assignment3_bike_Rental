import QueryBuilder from '../../Builder/BikeBuilder';
import { sendImageToCloudinary } from '../../utilities/sendImageToCloudinary';
import { Tbike } from './bike.interface';
import { Bike } from './bike.model';
import { Express } from 'express';

const createBikeIntoDb = async (
  data: Tbike,
  file: Express.Multer.File & { path?: string },
) => {
  const imageName = `${Math.floor(100 + Math.random() * 900)}`;
  const path = file?.path;
  const { secure_url } = (await sendImageToCloudinary(imageName, path)) as {
    secure_url: string;
  };

  if (secure_url) {
    data.image = secure_url as string;
  }

  const result = await Bike.create(data);
  return result;
};

const getAllbike = async () => {
  const result = await Bike.find({});

  return result;
};

const getBikeQuery = async (query: Record<string, unknown>) => {
  const bikeQuery = new QueryBuilder(Bike.find(), query).filter();

  const result = await bikeQuery.modelQuery;
  const meta = await bikeQuery.countTotal();
  return { result, meta };
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
const getSingleBikeFromDb = async (id: string) => {
  console.log('i am here', id);
  const result = await Bike.findById(id);
  return result;
};

const updateBike = async (_id: string, payload: Partial<Tbike>) => {
  const isBikeExists = await Bike.findById({ _id: _id });

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
  getBikeQuery,
  getSingleBikeFromDb,
};

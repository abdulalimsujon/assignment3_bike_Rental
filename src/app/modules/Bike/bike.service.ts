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
  if (path) {
    const { secure_url } = (await sendImageToCloudinary(imageName, path)) as {
      secure_url: string;
    };

    if (secure_url) {
      data.image = secure_url as string;
    } else {
      data.image = 'no image';
    }
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
  console.log(_id);
  const isBikeExists = await Bike.findOne({ _id: _id });

  if (!isBikeExists) {
    throw new Error('this is not valid bike id');
  }
  const result = await Bike.findByIdAndDelete(
    { _id: _id },
    {
      new: true,
    },
  );
  return result;
};
const getSingleBikeFromDb = async (id: string) => {
  const result = await Bike.findById(id);
  return result;
};

const updateBike = async ({
  id,
  data,
  file,
}: {
  id: string;
  data: Tbike;
  file: Express.Multer.File & { path?: string };
}) => {
  const isBikeExists = await Bike.findById({ _id: id });

  if (!isBikeExists) {
    throw new Error('This is not a valid bike ID');
  }

  if (file) {
    const imageName = `${Math.floor(100 + Math.random() * 900)}`;
    const path = file?.path;
    const { secure_url } = (await sendImageToCloudinary(imageName, path)) as {
      secure_url: string;
    };

    if (secure_url) {
      data.image = secure_url; // Update with the new uploaded image
    }
  } else if (!data.image) {
    // If no file and data.image is missing, retain the existing image
    data.image = isBikeExists.image;
  }

  const result = await Bike.findByIdAndUpdate({ _id: id }, data, {
    new: true,
    runValidators: true,
  });

  return result;
};

const getAvailableBikeFromDb = async () => {
  const result = await Bike.find({
    isAvailable: true,
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
  getAvailableBikeFromDb,
};

import config from '../../config';
import { Tuser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';

const createUserIntoDb = async (payload: Tuser) => {
  const result = await User.create(payload);

  return result;
};

const getMe = async (id: string) => {
  const result = await User.findOne({ _id: id });
  return result;
};

const updateProfileIntoDb = async (_id: string, payload: Partial<Tuser>) => {
  if (payload?.password) {
    const password = await bcrypt.hash(
      payload.password as string,
      Number(config.salt_round),
    );

    payload.password = password;
  }

  const result = await User.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  }).select('-createdAt -updatedAt -__v');
  return result;
};

export const userServices = {
  createUserIntoDb,
  getMe,
  updateProfileIntoDb,
};

import config from '../../config';
import { Tuser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';

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

const deleteUserIntoDb = async (_id: string) => {
  const result = await User.findByIdAndDelete(_id);
  return result;
};

const getAlluserFromDb = async () => {
  const result = await User.find({});
  return result;
};

const changeUserRoleIntoDb = async (_id: string, role: string) => {
  const result = await User.findByIdAndUpdate(_id, { role });
  return result;
};

export const userServices = {
  getMe,
  getAlluserFromDb,
  updateProfileIntoDb,
  deleteUserIntoDb,
  changeUserRoleIntoDb,
};

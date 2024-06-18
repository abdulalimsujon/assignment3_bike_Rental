import { Schema, model } from 'mongoose';
import { Tuser } from './user.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<Tuser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      validate: {
        validator: (value: string) => validator.isEmail(value),

        message: '{VALUE} is not valid email',
      },
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: 0,
    },
    phone: String,
    address: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook we save our data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(user.password, Number(config.salt_round));

  next();
});

userSchema.post('save', function (doc, next) {
  this.password = '';
  next();
});

export const User = model<Tuser>('user', userSchema);

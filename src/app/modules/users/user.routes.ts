import express from 'express';

import { userController } from './user.controller';
import Auth from '../../middleware/auth';
import validataRequest from '../../middleware/validateSchemaRequest';
import { uservalidation } from './user.validation';

const router = express.Router();

router.get('/me', Auth('user', 'admin'), userController.getMe);

router.put(
  '/me',
  Auth('user', 'admin'),
  validataRequest(uservalidation.updateUserValidation),
  userController.updateProfile,
);

export const userRouter = router;

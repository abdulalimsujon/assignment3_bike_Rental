import express from 'express';

import { userController } from './user.controller';
import Auth from '../../middleware/auth';
import validataRequest from '../../middleware/validateSchemaRequest';
import { uservalidation } from './user.validation';

const router = express.Router();

router.get('/me', Auth('user', 'admin'), userController.getMe);
router.get('/all-user', Auth('admin'), userController.getAllUser);
router.delete('/delete-user/:userId', Auth('admin'), userController.deleteUser);
router.put(
  '/update-role/:userId',
  Auth('admin'),
  userController.ChangeUserRole,
);

router.put(
  '/me',
  Auth('user', 'admin'),
  validataRequest(uservalidation.updateUserValidation),
  userController.updateProfile,
);

export const userRouter = router;

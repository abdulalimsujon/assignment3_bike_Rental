import express from 'express';
import validataRequest from '../../middleware/validateSchemaRequest';
import { uservalidation } from '../users/user.validation';
import { authControllers } from './auth.controller';
import { upload } from '../../utilities/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/signup',
  upload.single('image'),

  validataRequest(uservalidation.createUserValidation),
  authControllers.UserSignUp,
);
router.post(
  '/login',
  validataRequest(uservalidation.userLoginvalidation),
  authControllers.userLogin,
);

export const authRouter = router;

import express from 'express';
import validataRequest from '../../middleware/validateSchemaRequest';
import { uservalidation } from '../users/user.validation';
import { authControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validataRequest(uservalidation.createUserValidation),
  authControllers.UserSignUp,
);
router.post(
  '/login',
  validataRequest(uservalidation.userLoginvalidation),
  authControllers.userLogin,
);

export const userRouter = router;

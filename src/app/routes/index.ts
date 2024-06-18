import express from 'express';
import { authRouter } from '../modules/auth/auth.route';
import { userRouter } from '../modules/users/user.routes';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

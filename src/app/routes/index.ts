import express from 'express';
import { userRouter } from '../modules/auth/auth.route';
const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

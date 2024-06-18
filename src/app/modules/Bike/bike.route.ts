import express from 'express';
import validataRequest from '../../middleware/validateSchemaRequest';
import { bikeValidation } from './bike.validation';
import { bikeController } from './bike.controller';
import Auth from '../../middleware/auth';
const router = express.Router();

router.post(
  '/',
  Auth('admin'),
  validataRequest(bikeValidation.createBikeSchema),
  bikeController.createBike,
);
router.delete('/:id', Auth('admin'), bikeController.deleteBike);
router.put(
  '/:id',
  Auth('admin'),
  validataRequest(bikeValidation.updateBikeSchema),
  bikeController.updateBike,
);
router.get('/', bikeController.getAllBike);

export const bikeRouter = router;

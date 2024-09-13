import express, { Request, Response, NextFunction } from 'express';
import validateRequest from '../../middleware/validateSchemaRequest';
import { bikeValidation } from './bike.validation';
import { bikeController } from './bike.controller';
import Auth from '../../middleware/auth';
import { upload } from '../../utilities/sendImageToCloudinary';

const router = express.Router();

// Define a custom interface for your request body
interface BikeRequestBody {
  brand: string;
  pricePerHour: number;
  name: string;
  cc: number;
  description: string;
  year: number;
  model: string;
}

router.post(
  '/',
  upload.single('image'),
  (
    req: Request<Record<string, never>, Record<string, never>, BikeRequestBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const { brand, pricePerHour, name, cc, description, year, model } =
      req.body;

    // Convert numerical fields to numbers
    req.body = {
      brand,
      pricePerHour: Number(pricePerHour),
      name,
      cc: Number(cc),
      description,
      year: Number(year),
      model,
    };

    next();
  },
  Auth('admin'),
  validateRequest(bikeValidation.createBikeSchema),
  bikeController.createBike,
);

router.delete('/:bikeId', Auth('admin'), bikeController.deleteBike);

router.put(
  '/:bikeId',
  Auth('admin'),
  validateRequest(bikeValidation.updateBikeSchema),
  bikeController.updateBike,
);

router.get('/getBike', bikeController.getAllBikeQuery);

router.get('/single-bike/:bikeId', bikeController.getSingleBike);

export const bikeRouter = router;

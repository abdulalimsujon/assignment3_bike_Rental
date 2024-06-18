import { Types } from 'mongoose';

export type Trental = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime?: string;
  returnTime?: string | null;
  totalCost?: number;
  isReturned?: boolean;
};

export default Trental;

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  TErrorSources,
  TgenericRerrorResponse,
} from '../interface/TerrorResources';

const handleDublicateKeyError = (error: any): TgenericRerrorResponse => {
  const cleanedMessage = error?.errorResponse?.errmsg.replace(
    /Car_Rental\.users index:\s*/,
    '',
  );
  const errorSources: TErrorSources = [
    {
      path: error?.keyValue,
      message: cleanedMessage,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: cleanedMessage,
    errorSources,
  };
};

export default handleDublicateKeyError;

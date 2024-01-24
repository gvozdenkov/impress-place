import { ResStatus } from '../types';

export var responseBuilder = (status: ResStatus, data?: any, message?: string) => {
  var successRes = {
    status,
    data,
  };

  var errorRes = {
    status,
    message,
  };

  return status === 'success' ? successRes : errorRes;
};

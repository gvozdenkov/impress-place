import { ResStatus } from '#types';

type FormatResponseDataReturn = {
  status: ResStatus;
  data: any;
};

export var formatResponseData = (data: any): FormatResponseDataReturn => ({
  status: 'success',
  data,
});

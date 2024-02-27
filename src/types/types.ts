import { Types } from 'mongoose';

export type ResStatus = 'success' | 'fail' | 'error';

export type TokenType = 'accessToken' | 'refreshToken';

export type UserId = string | Types.ObjectId;

export type CardId = UserId;

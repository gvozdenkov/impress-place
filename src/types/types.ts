import mongoose from 'mongoose';

export type ResStatus = 'success' | 'fail' | 'error';

export type TokenType = 'accessToken' | 'refreshToken';

export type MongoObjectID = mongoose.Types.ObjectId;

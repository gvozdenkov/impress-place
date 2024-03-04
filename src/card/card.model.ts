import { Schema, model, Types, MongooseError } from 'mongoose';
import { message } from '../messages';
import { validate, catchMongooseError } from '../utils';

var schemaOptions = {
  versionKey: false,
  timestamps: true,
};

export type CardSchema = {
  name: string;
  link: string;
  likes: [Types.ObjectId];
  owner: Types.ObjectId;
};

export var CARD = {
  nameCardMinLength: 2,
  nameCardMaxLength: 30,
} as const;

var cardSchema = new Schema<CardSchema>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [CARD.nameCardMinLength, message.minLength(CARD.nameCardMinLength)],
      maxlength: [CARD.nameCardMaxLength, message.maxLength(CARD.nameCardMaxLength)],
    },
    link: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v: string) => validate.url(v),
        message: message.invalidUrl(),
      },
    },
    likes: {
      type: [Types.ObjectId],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  schemaOptions,
);

cardSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

cardSchema.post('findOne', (_error: MongooseError, _doc: any, next: any) =>
  catchMongooseError(_error, next, message.notFound('card')),
);

cardSchema.post('findOneAndDelete', (_error: MongooseError, _doc: any, next: any) =>
  catchMongooseError(_error, next, message.findOneAndDeleteError('card')),
);

cardSchema.post('findOneAndUpdate', (_error: MongooseError, _doc: any, next: any) =>
  catchMongooseError(_error, next, message.findOneAndUpdateError('card')),
);

export var Card = model<CardSchema>('Card', cardSchema);

export type CardDocument = InstanceType<typeof Card>;

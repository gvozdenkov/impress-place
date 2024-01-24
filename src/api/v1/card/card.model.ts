import { Schema, model, Types } from 'mongoose';
import { modelValidate } from '../middlewares';

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
      minlength: [CARD.nameCardMinLength, `Must be at least ${CARD.nameCardMinLength}`],
      maxlength: [CARD.nameCardMaxLength, `Should be maximum ${CARD.nameCardMaxLength}`],
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => modelValidate.url(v),
        message: '"{VALUE}" is not valid url',
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

export var Card = model<CardSchema>('Card', cardSchema);

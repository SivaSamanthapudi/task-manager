import mongoose, { Schema } from 'mongoose';
import { EXPENSE, GROUP, USER } from './constants.model';

const groupSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  currency: { type: String, required: true },
  createdOn: { type: Date, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: USER,
    },
  ],
  expenses: [
     {
      type: mongoose.Schema.Types.ObjectId,
      ref: EXPENSE,
    },
  ],
});

export const Group = mongoose.model(GROUP, groupSchema);

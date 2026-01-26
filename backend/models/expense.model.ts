import mongoose, { Schema } from 'mongoose';
import { EXPENSE, USER } from './constants.model';

const expenseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  type: { type: String, required: false },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  createdOn: { type: Date, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
    required: true,
  },
});

export const Expense = mongoose.model(EXPENSE, expenseSchema);

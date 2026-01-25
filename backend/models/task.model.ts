import mongoose, { Schema} from 'mongoose';
import { TASK, USER } from './constants.model';

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueBy: {
    type: Date,
    required: false,
  },
  updatedOn: {
    type: Date,
    required: false,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Task = mongoose.model(TASK, taskSchema);
import mongoose, { Schema} from 'mongoose';
import { POST } from './constants.model';

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: false
  },
});

export const Post =  mongoose.model(POST, postSchema);
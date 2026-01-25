import mongoose, { Schema} from 'mongoose';

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

export const Post =  mongoose.model('Post', postSchema);
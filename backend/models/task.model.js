const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Task', taskSchema);

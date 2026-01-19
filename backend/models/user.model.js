const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
  dateOfBirth: { type: Date, required: [true, 'Date of birth is required'] },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true, // Good practice: store emails in lowercase
    trim: true,      // Remove accidental whitespace
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] 
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'], // Fixed consistency
    // match: [/\S+@\S+\.\S+/, 'Password must contain at least one number and one special character'],
    select: false // <--- This prevents password from leaking in GET requests
  },
  roles: { 
    type: [String], 
    default: ['USER'], // Changed default to just USER for security
    enum: ['ADMIN', 'USER', 'MODERATOR'] // Restricts roles to valid options
  },
});

// The "Pre-save" hook (Clean Async version)
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err; // Mongoose catches thrown errors in hooks
  }
});

module.exports = mongoose.model('User', userSchema);
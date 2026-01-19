const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { simplifiedErrors } = require('../utils/helper');
const { VALIDATION_ERROR, SECRET_KEY } = require('../utils/constants');
const { TOKEN_EXPIRY_TIME } = require('../config/config');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    const createdUser = await user.save();
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: createdUser._id, email: createdUser.email },
      registered: true
    });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ code: 'EMAIL_REGISTERED_ALREADY' });
    if (err.name === VALIDATION_ERROR) {
      return res.status(422).json({ errors: simplifiedErrors(err.errors) });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Note: We use .select('+password') because we set select:false in the model
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials', code: 'AUTH_FAILED' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: TOKEN_EXPIRY_TIME }, // Token expires in 1 hour
    );

    res.status(200).json({
      message: 'Login successful',
      token: token,
      expiresIn: 3600, // Tell the frontend it lasts 3600 seconds
      user: { id: user._id, firstName: user.firstName },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.status(200).json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (err) {
    res.status(500).json({ message: 'Fetching users failed' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = new User({
      _id: req.params.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      password: req.body.password,
      roles: req.body.roles,
    });
    // Incorrect usage - as updateOne does not work as expected with pre-save-hooks,
    // so we use findOne and then save as we are working with hashing password in pre-save hook
    //      await User.updateOne({ _id: req.params.id }, user).save();
    await User.findOne({ _id: req.params.id }, user).save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch {
    res.status(500).json({ message: 'Updating user failed' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'User deleted' });
  } catch {
    res.status(500).json({ message: 'Deleting user failed' });
  }
};

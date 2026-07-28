import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { simplifiedErrors } from '../utils/helper';
import { VALIDATION_ERROR, SECRET_KEY } from '../utils/constants';
import { User, IUser } from '../models/user.model';

export const register = async (req: Request<{}, {}, IUser>, res: Response) => {
  try {
    const user = new User(req.body as IUser);
    const createdUser = await user.save();
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: createdUser._id, email: createdUser.email },
      registered: true,
    });
  } catch (err: any) {
    if (err.code === 11000) return res.status(409).json({ code: 'EMAIL_REGISTERED_ALREADY' });
    if (err.name === VALIDATION_ERROR) {
      return res.status(422).json({ errors: simplifiedErrors(err.errors) });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password!))) {
      return res.status(401).json({     code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      expiresIn: 3600,
      user: { id: user._id, firstName: user.firstName },
      code: 'LOGIN_SUCCESS', 
      message: 'Login Successful',
    });
  } catch (err) {
    res.status(500).json({ code: 'LOGIN_FAILED', message: 'Login failed' });
  }
};

export const getAllUsers = async (req:Request, res: Response) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.status(200).json({
      message: 'Users fetched successfully',
      users,
      code: 'USER_FETCH_SUCCESS',
    });
  } catch (err) {
    res.status(500).json({ code: 'USER_FETCH_FAILED', message: 'Fetching users failed' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    // 1. Find the existing document
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ 
        code: 'USER_NOT_FOUND', 
        message: 'User not found' 
      });
    }

    // 2. Update the fields
    // We only update if the field exists in req.body
    user.firstName = req.body.firstName ?? user.firstName;
    user.lastName = req.body.lastName ?? user.lastName;
    user.dateOfBirth = req.body.dateOfBirth ?? user.dateOfBirth;
    user.email = req.body.email ?? user.email;
    user.roles = req.body.roles ?? user.roles;

    // 3. Handle password specifically
    // If a new password is provided, setting it here marks it as 'modified'
    // and triggers your pre-save hashing logic!
    if (req.body.password) {
      user.password = req.body.password;
    }

    // 4. Save the document
    await user.save();

    res.status(200).json({ 
      code: 'USER_UPDATE_SUCCESS', 
      message: 'User updated successfully' 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      code: 'USER_UPDATE_FAILED', 
      message: 'Updating user failed' 
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ code: 'USER_DELETE_SUCCESS', message: 'User deleted' });
  } catch {
    res.status(500).json({ code: 'USER_DELETE_FAILED', message: 'Deleting user failed' });
  }
};


import { ERROR_TYPE } from "../enums/enums";
import { IError } from "../interfaces/interfaces";

export const ERRORS: IError[] = [
  {
    code: 'REGISTRATION_SUCCESS',
    message: 'Registration Successfull',
    type: ERROR_TYPE.SUCCESS,
  },
  {
    code: 'EMAIL_REGISTERED_ALREADY',
    message: 'This email is already registered. Please use a different email.',
    type: ERROR_TYPE.INFO,
  },
  {
    code: 'USER_EMAIL_NOT_FOUND',
    message: 'No account found with this email. Please sign up first.',
    type: ERROR_TYPE.INFO,
  },
  {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
    type: ERROR_TYPE.FAILED,
  },
  {
    code: 'LOGIN_FAILED',
    message: 'Login failed!!',
    type: ERROR_TYPE.FAILED,
  },
  {
    code: 'INVALID_CREDENTIALS',
    message: 'Login Failed!! Invalid credentials',
    type: ERROR_TYPE.ERROR,
  },
  {
    code: 'LOGIN_SUCCESS',
    message: 'Login successful',
    type: ERROR_TYPE.SUCCESS,
  },
  // {
  //   code: 'USER_FETCH_SUCCESS',
  //   message: 'Users fetched successfully',
  //   type: ERROR_TYPE.SUCCESS,
  // },
  // {
  //   code: 'USER_FETCH_FAILED',
  //   message: 'Fetching users failed',
  //   type: ERROR_TYPE.FAILED,
  // },
  {
    code: 'USER_UPDATE_SUCCESS',
    message: 'User updated successfully',
    type: ERROR_TYPE.SUCCESS,
  },
  {
    code: 'USER_UPDATE_FAILED',
    message: 'Updating user failed',
    type: ERROR_TYPE.FAILED,
  },
  {
    code: 'USER_DELETE_SUCCESS',
    message: 'User deleted successfully',
    type: ERROR_TYPE.SUCCESS,
  },
  {
    code: 'USER_DELETE_FAILED',
    message: 'Deleting user failed',
    type: ERROR_TYPE.FAILED,
  },
  {
    code: 'FIELD_VALIDATIONS_FAILED',
    message: 'Field validation failed',
    type: ERROR_TYPE.VALIDATION,
  },
  {
    code: 'TASK_CREATE_SUCCESS',
    message: 'Task created successfully',
    type: ERROR_TYPE.SUCCESS,
  },
  {
    code: 'TASK_CREATE_FAILED',
    message: 'Task creating failed',
    type: ERROR_TYPE.FAILED,
  },
  // {
  //   code: 'TASK_FETCH_SUCCESS',
  //   message: 'Tasks fetched successfully',
  //   type: ERROR_TYPE.SUCCESS,
  // },
  // {
  //   code: 'TASK_FETCH_FAILED',
  //   message: 'Fetching tasks failed',
  //   type: ERROR_TYPE.FAILED,
  // },
  {
    code: 'TASK_UPDATE_SUCCESS',
    message: 'Task updated successfully',
    type: ERROR_TYPE.SUCCESS,
  },
  {
    code: 'TASK_UPDATE_FAILED',
    message: 'Updating task failed',
    type: ERROR_TYPE.FAILED,
  },
  {
    code: 'UNAUTHORISED',
    message: 'Unauthorised to do this action!',
    type: ERROR_TYPE.UNAUTHORISED,
  },
  {
    code: 'TASK_DELETE_SUCCESS',
    message: 'Task deleted successfully',
    type: ERROR_TYPE.SUCCESS,
  },
  {
    code: 'TASK_DELETE_FAILED',
    message: 'Task Deletion failed',
    type: ERROR_TYPE.FAILED,
  },
  {
    code: 'POST_ADD_SUCCESS',
    message: 'Post added successfully',
    type: ERROR_TYPE.SUCCESS,
  },
  {
    code: 'POST_ADD_FAILED',
    message: 'Creating post failed',
    type: ERROR_TYPE.FAILED,
  },
  // {
  //   code: 'POST_FETCH_SUCCESS',
  //   message: 'Posts fetched successfully',
  //   type: ERROR_TYPE.SUCCESS,
  // },
  {
    code: 'POST_FETCH_FAILED',
    message: 'Post fetching failed',
    type: ERROR_TYPE.FAILED,
  },
  {
    code: 'POST_UPDATE_SUCCESS',
    message: 'Post updated successfully',
    type: ERROR_TYPE.SUCCESS,
  },
  {
    code: 'POST_UPDATE_FAILED',
    message: 'Updating post failed',
    type: ERROR_TYPE.FAILED,
  },
  {
    code: 'POST_DELETE_SUCCESS',
    message: 'Post deleted successfully',
    type: ERROR_TYPE.SUCCESS,
  },
  {
    code: 'POST_DELETE_FAILED',
    message: 'Post deleting failed',
    type: ERROR_TYPE.FAILED,
  },
];

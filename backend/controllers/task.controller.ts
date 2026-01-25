
import { Task } from '../models/task.model';
import { Request, Response } from 'express';
import { VALIDATION_ERROR } from '../utils/constants';

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, description, createdAt, dueBy } = req.body;
    const creator = req.userData.userId;

    // ✅ Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        code: 'FIELD_VALIDATIONS_FAILED',
        message: 'Validation failed: title and description are required',
      });
    }

    // ✅ Create new task
    const task = new Task({
      title,
      description,
      createdAt: createdAt ?? new Date(),
      dueBy: dueBy ?? null,
      updatedOn: null,
      creator,
    });

    const createdTask = await task.save();

    res.status(201).json({
      message: 'Task created successfully',
      code: 'TASK_CREATE_SUCCESS',
      task: {
        id: createdTask._id,
        title: createdTask.title ?? null,
        description: createdTask.description ?? null,
        createdAt: createdTask.createdAt ?? null,
        dueBy: createdTask.dueBy ?? null,
        updatedOn: createdTask.updatedOn ?? null,
        creator,
      },
    });
  } catch (err: any) {
    // console.error('Error creating task:', err);

    // ✅ Return error details if available
    if (err.name === VALIDATION_ERROR) {
      return res.status(422).json({
        message: 'Task data validation failed',
        code: 'FIELD_VALIDATIONS_FAILED',
        errors: err.errors,
      });
    }

    res.status(500).json({
      message: 'Creating task failed due to server error',
      error: err.message ?? 'Unknown error',
    });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const size = parseInt(req.query.size as string, 10) || 5;

    const skip = (page - 1) * size;
    console.error('req',req);

    // Fetch paginated tasks
    const tasks = await Task.find().skip(skip).limit(size).sort({ createdAt: -1 }); // optional sorting

    // Get total count
    const totalCount = await Task.countDocuments();

    const transformedTasks = tasks.map((task) => ({
      id: task._id,
      title: task.title,
      description: task.description,
      createdAt: task.createdAt,
      dueBy: task.dueBy,
      updatedOn: task.updatedOn,
      creator: task.creator ?? null,
    }));

    res.status(200).json({
      message: 'Tasks fetched successfully',
      code: 'TASK_FETCH_SUCCESS',
      tasks: transformedTasks,
      count: totalCount,
      pagination: {
        totalItems: totalCount,
        currentPage: page,
        pageSize: size,
        totalPages: Math.ceil(totalCount / size),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Fetching tasks failed',
      code: 'TASK_FETCH_SUCCESS',
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = {
      // _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      createdAt: req.body.createdAt,
      dueby: req.body.dueby,
      updatedOn: req.body.updatedOn,
    };

    await Task.updateOne({ _id: req.params.id }, task);

    res.status(200).json({ code: 'TASK_UPDATE_SUCCESS', message: 'Task updated successfully' });
  } catch {
    res.status(500).json({ code: 'TASK_UPDATE_FAILED', message: 'Updating task failed' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const result = await Task.deleteOne({
      _id: req.params.id,
      creator: req.userData.userId,
    });

    if (result.deletedCount > 0) {
      res.status(200).json({ code: 'TASK_DELETE_SUCCESS', message: 'Task deleted successfully' });
    } else {
      // If 0 tasks were deleted, it's usually because the 'creator' didn't match
      res.status(401).json({ code: 'UNAUTHORISED', message: 'Not authorized or task not found!' });
    }
  } catch {
    res.status(500).json({ code: 'TASK_DELETE_FAILED', message: 'Deleting task failed' });
  }
};

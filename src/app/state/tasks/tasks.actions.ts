import { createAction, props } from '@ngrx/store';
import { Task } from '../../../models/task.model';

export const loadTasks = createAction('[Tasks] Load Tasks', props<{ page?: number; size?: number }>());
export const loadTasksSuccess = createAction('[Tasks] Load Tasks Success', props<{ tasks: Task[]; count: number; page: number; size: number }>());
export const loadTasksFailure = createAction('[Tasks] Load Tasks Failure', props<{ error: any }>());

export const addTask = createAction('[Tasks] Add Task', props<{ task: Task }>());
export const addTaskSuccess = createAction('[Tasks] Add Task Success', props<{ task: Task }>());
export const addTaskFailure = createAction('[Tasks] Add Task Failure', props<{ error: any }>());

export const updateTask = createAction('[Tasks] Update Task', props<{ task: Task }>());
export const updateTaskSuccess = createAction('[Tasks] Update Task Success', props<{ task: Task }>());
export const updateTaskFailure = createAction('[Tasks] Update Task Failure', props<{ error: any }>());

export const deleteTask = createAction('[Tasks] Delete Task', props<{ id: string }>());
export const deleteTaskSuccess = createAction('[Tasks] Delete Task Success', props<{ id: string }>());
export const deleteTaskFailure = createAction('[Tasks] Delete Task Failure', props<{ error: any }>());

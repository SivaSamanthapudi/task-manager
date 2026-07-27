import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as TasksActions from './tasks.actions';
import { Task } from '../../../models/task.model';

export const tasksFeatureKey = 'tasks';

export interface State extends EntityState<Task> {
  loading: boolean;
  error: any | null;
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

export const adapter = createEntityAdapter<Task>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 5,
  totalCount: 0,
});

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.loadTasks, (state, { page = 1, size = 5 }) => ({ ...state, loading: true, currentPage: page, pageSize: size })),
  on(TasksActions.loadTasksSuccess, (state, { tasks, count, page, size }) =>
    adapter.setAll(tasks, { ...state, loading: false, totalCount: count, currentPage: page, pageSize: size }),
  ),
  on(TasksActions.loadTasksFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(TasksActions.addTaskSuccess, (state, { task }) => adapter.addOne(task, state)),
  on(TasksActions.updateTaskSuccess, (state, { task }) => adapter.upsertOne(task, state)),
  on(TasksActions.deleteTaskSuccess, (state, { id }) => adapter.removeOne(id, state)),
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

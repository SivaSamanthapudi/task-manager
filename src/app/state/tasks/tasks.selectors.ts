import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTasks from './tasks.reducer';

export const selectTasksState = createFeatureSelector<fromTasks.State>(fromTasks.tasksFeatureKey);

export const selectAllTasks = createSelector(selectTasksState, fromTasks.selectAll);
export const selectTasksLoading = createSelector(selectTasksState, (s) => s.loading);
export const selectTasksError = createSelector(selectTasksState, (s) => s.error);
export const selectTasksTotalCount = createSelector(selectTasksState, (s) => s.totalCount);
export const selectTasksPageInfo = createSelector(selectTasksState, (s) => ({ page: s.currentPage, size: s.pageSize }));

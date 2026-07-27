import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TasksActions from './tasks.actions';
import { TasksService } from '../../../services/tasks.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TasksEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      mergeMap((action) =>
        this.tasksService.fetchTasks$(action.page ?? 1, action.size ?? 5).pipe(
          map((res) => TasksActions.loadTasksSuccess({ tasks: res.tasks, count: res.count, page: action.page ?? 1, size: action.size ?? 5 })),
          catchError((error) => of(TasksActions.loadTasksFailure({ error }))),
        ),
      ),
    ),
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addTask),
      mergeMap((action) =>
        this.tasksService.addTask$(action.task).pipe(
          map((task) => TasksActions.addTaskSuccess({ task })),
          catchError((error) => of(TasksActions.addTaskFailure({ error }))),
        ),
      ),
    ),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      mergeMap((action) =>
        this.tasksService.updateTask$(action.task).pipe(
          map((task) => TasksActions.updateTaskSuccess({ task })),
          catchError((error) => of(TasksActions.updateTaskFailure({ error }))),
        ),
      ),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      mergeMap((action) =>
        this.tasksService.deleteTask$(action.id).pipe(
          map((id) => TasksActions.deleteTaskSuccess({ id })),
          catchError((error) => of(TasksActions.deleteTaskFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private tasksService: TasksService) {}
}

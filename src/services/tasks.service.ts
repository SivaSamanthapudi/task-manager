import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { TASKS_API_URL } from '../constants/constants';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private _tasks = signal<{ tasks: Task[]; count: number }>({ tasks: [], count: 0 });
  tasks = computed(() => this._tasks().tasks);
  totalCount = computed(() => this._tasks().count);

  constructor(private http: HttpClient) {}

  getTasks(pageNumber: number = 1, pageSize: number = 5) {
    const GET_TASKS_API_URL = `${TASKS_API_URL}?page=${pageNumber}&size=${pageSize}`;
    this.http
      .get<{ message: string; tasks: any[]; count: number }>(GET_TASKS_API_URL)
      .pipe(
        map((res) => {
          return {
            count: res.count,
            tasks: res.tasks.map((p) => ({
              id: p.id,
              title: p.title,
              description: p.description,
              createdAt: new Date(p.createdAt),
              updatedOn: p.updatedOn ? new Date(p.updatedOn) : null,
              dueBy: p.dueBy ? new Date(p.dueBy) : null,
              creator: p.creator ?? null
            })),
          };
        }),
      )
      .subscribe((data) => this._tasks.set({ tasks: data.tasks, count: data.count }));
  }

  addTask(title: string, description: string, updatedOn: Date | null, dueBy: Date | null) {
    const task: Task = {
      title,
      description,
      createdAt: new Date(),
      updatedOn: updatedOn ?? null,
      dueBy: dueBy ?? null,
    };

    this.http.post<{ message: string; task: Task }>(TASKS_API_URL, task).subscribe((res) =>
      this._tasks.update((state) => ({
        tasks: [...state.tasks, res.task],
        count: state.count + 1,
      })),
    );
  }

  updateTask(task: Task) {
    const updatedTask: Task = task;

    this.http.put(`${TASKS_API_URL}/${updatedTask.id}`, updatedTask).subscribe(() => {
      this._tasks.update((state) => ({
        ...state, // Spread the state to keep the 'count' intact
        tasks: state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      }));
    });
  }

  deleteTask(id: string) {
    this.http.delete(`${TASKS_API_URL}/${id}`).subscribe(() => {
      this._tasks.update((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        count: state.count - 1, // Keep the count accurate
      }));
    });
  }

  clearTasksCache() {
    this._tasks.set({ tasks: [], count: 0 });
  }
}

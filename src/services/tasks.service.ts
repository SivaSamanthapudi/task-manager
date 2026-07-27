import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { TASKS_API_URL } from '../utils/constants/url.constants';
import { Task } from '../models/task.model';
import { ITEMS_PER_PAGE } from '../utils/constants/constants';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private _tasks = signal<{ tasks: Task[]; count: number }>({ tasks: [], count: 0 });
  tasks = computed(() => this._tasks().tasks);
  totalCount = computed(() => this._tasks().count);
  private taskCache = new Map<string, { tasks: any[]; count: number }>();

  constructor(private http: HttpClient) {}

  // Observable APIs for NgRx effects
  fetchTasks$(pageNumber: number = 1, pageSize: number = 5) {
    const GET_TASKS_API_URL = `${TASKS_API_URL}?page=${pageNumber}&size=${pageSize}`;

    return this.http.get<{ message: string; tasks: any[]; count: number }>(GET_TASKS_API_URL).pipe(
      map((res) => ({
        count: res.count,
        tasks: res.tasks.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          createdAt: new Date(p.createdAt),
          updatedOn: p.updatedOn ? new Date(p.updatedOn) : null,
          dueBy: p.dueBy ? new Date(p.dueBy) : null,
          creator: p.creator ?? null,
        })),
      })),
    );
  }

  addTask$(task: Task) {
    return this.http.post<{ message: string; task: Task }>(TASKS_API_URL, task).pipe(map((r) => r.task));
  }

  updateTask$(task: Task) {
    return this.http.put(`${TASKS_API_URL}/${task.id}`, task).pipe(map(() => task));
  }

  deleteTask$(id: string) {
    return this.http.delete(`${TASKS_API_URL}/${id}`).pipe(map(() => id));
  }

  // Existing signal/cache-based APIs for backward compatibility
  getTasks(pageNumber: number = 1, pageSize: number = 5) {
    const cacheKey = `${pageNumber}_${pageSize}`;

    if (this.taskCache.has(cacheKey)) {
      const cachedData = this.taskCache.get(cacheKey)!;
      this._tasks.set(cachedData);
      return;
    }

    this.fetchTasks$(pageNumber, pageSize).subscribe((data) => {
      // 💾 Save to cache
      this.taskCache.set(`${pageNumber}_${pageSize}`, data);
      this._tasks.set(data);
    });
  }

  addTask(title: string, description: string, updatedOn: Date | null, dueBy: Date | null | string) {
    const task: Task = {
      title,
      description,
      createdAt: new Date(),
      updatedOn: updatedOn ?? null,
      dueBy: dueBy ?? null,
    };

    this.addTask$(task).subscribe(() => {
      this.clearTaskCache();
      this.getTasks(1, ITEMS_PER_PAGE);
    });
  }

  updateTask(task: Task) {
    const updatedTask: Task = task;

    this.updateTask$(updatedTask).subscribe(() => {
      this.clearTaskCache();
      this.getTasks(1, ITEMS_PER_PAGE);
    });
  }

  deleteTask(id: string) {
    this.deleteTask$(id).subscribe(() => {
      this.clearTaskCache();
      this.getTasks(1, ITEMS_PER_PAGE);
    });
  }

  clearTasksCache() {
    this._tasks.set({ tasks: [], count: 0 });
  }

  clearTaskCache() {
    this.taskCache.clear();
  }
}

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as TasksSelectors from '../../../app/state/tasks/tasks.selectors';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-insights',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row">
      <div class="col-12">
        <h5 class="mb-3">Task Insights</h5>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card shadow-sm p-3">
          <div class="text-muted">Total Tasks</div>
          <div class="h3 mt-2">{{ totalTasks() }}</div>
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card shadow-sm p-3">
          <div class="text-muted">Overdue Tasks</div>
          <div class="h3 mt-2 text-danger">{{ overdueTasks() }}</div>
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card shadow-sm p-3">
          <div class="text-muted">Due Within 7 Days</div>
          <div class="h3 mt-2 text-warning">{{ dueSoonTasks() }}</div>
        </div>
      </div>

      <div class="col-12">
        <div class="card shadow-sm p-3">
          <div class="mb-2 text-muted">Upcoming Tasks</div>
          @if (recentTasks().length > 0) {
            <ul class="list-group list-group-flush">
              @for (const task of recentTasks()) {
                <li class="list-group-item">
                  <strong>{{ task.title }}</strong>
                  <div class="small text-muted">
                    Due: {{ task.dueBy ? (new Date(task.dueBy).toLocaleDateString()) : 'No due date' }}
                  </div>
                </li>
              }
            </ul>
          } @else {
            <p class="text-muted m-0">No upcoming tasks to display.</p>
          }
        </div>
      </div>
    </div>
  `,
})
export class TaskInsightsComponent {
  private store = inject(Store);
  totalTasks = signal(0);
  overdueTasks = signal(0);
  dueSoonTasks = signal(0);
  recentTasks = signal<Task[]>([]);

  constructor() {
    this.store.select(TasksSelectors.selectAllTasks).subscribe((tasks) => {
      this.totalTasks.set(tasks.length);
      this.overdueTasks.set(this.calculateOverdue(tasks));
      this.dueSoonTasks.set(this.calculateDueSoon(tasks));
      this.recentTasks.set(this.calculateUpcoming(tasks));
    });
  }

  private calculateOverdue(tasks: Task[]): number {
    const now = new Date();
    return tasks.filter((task) => task.dueBy && new Date(task.dueBy) < now).length;
  }

  private calculateDueSoon(tasks: Task[]): number {
    const now = new Date();
    const soon = new Date(now);
    soon.setDate(now.getDate() + 7);
    return tasks.filter((task) => {
      const dueDate = task.dueBy ? new Date(task.dueBy) : null;
      return dueDate ? dueDate >= now && dueDate <= soon : false;
    }).length;
  }

  private calculateUpcoming(tasks: Task[]): Task[] {
    const now = new Date();
    return [...tasks]
      .filter((task) => task.dueBy && new Date(task.dueBy) >= now)
      .sort((a, b) => new Date(a.dueBy as Date).getTime() - new Date(b.dueBy as Date).getTime())
      .slice(0, 5);
  }
}

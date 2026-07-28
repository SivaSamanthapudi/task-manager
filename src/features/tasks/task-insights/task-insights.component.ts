import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as TasksSelectors from '../../../app/state/tasks/tasks.selectors';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-insights.component.html',
})
export class TaskInsightsComponent {
  totalTasks = signal(0);
  overdueTasks = signal(0);
  dueSoonTasks = signal(0);
  recentTasks = signal<Task[]>([]);

  constructor(private store: Store) {
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

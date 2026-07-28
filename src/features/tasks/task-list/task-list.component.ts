import { UserService } from './../../../services/user.service';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Task } from '../../../models/task.model';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { ITEMS_PER_PAGE } from '../../../utils/constants/constants';
import { Pagination } from '../../../utils/interfaces/interfaces';
import { Store } from '@ngrx/store';
import * as TasksActions from '../../../app/state/tasks/tasks.actions';
import * as TasksSelectors from '../../../app/state/tasks/tasks.selectors';
import { CardComponent } from '../../../shared/card.component';
import { ActionButtonComponent } from '../../../shared/action-button.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, TaskCreateComponent, CardComponent, ActionButtonComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  private store = inject(Store);
  tasks = signal<Task[]>([]);
  totalCount = signal<number>(0);
  selectedTask: Task = {} as Task;
  pageSize: number = ITEMS_PER_PAGE;
  currentPage = 1;
  showModal: boolean = false;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.store.select(TasksSelectors.selectAllTasks).subscribe((t) => this.tasks.set(t));
    this.store.select(TasksSelectors.selectTasksTotalCount).subscribe((c) => this.totalCount.set(c));
    this.load(this.currentPage, this.pageSize);
  }

  private load(page: number, size: number) {
    this.store.dispatch(TasksActions.loadTasks({ page, size }));
  }

  onEdit(task: Task) {
    this.selectedTask = { ...task, dueBy: this.formatDateForInput(task.dueBy) };
    this.showModal = true;
  }

  formatDateForInput(date: string | Date | null): string | null {
    if (!date) {
      return null;
    }
    const d = new Date(date);
    // Extract YYYY-MM-DD
    return d.toISOString().split('T')[0];
  }

  onDismiss() {
    this.selectedTask = {} as Task;
    this.showModal = false;
  }

  onDelete(id: string) {
    this.store.dispatch(TasksActions.deleteTask({ id }));
  }

  onPageChanged(event: Pagination) {
    this.pageSize = event.pageSize;
    this.currentPage = event.currentPage;
    this.load(this.currentPage, this.pageSize);
  }

  onCountChange(event: Pagination) {
    this.pageSize = event.pageSize;
    this.currentPage = event.currentPage;
    this.load(this.currentPage, this.pageSize);
  }
}

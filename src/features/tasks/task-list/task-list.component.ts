import { UserService } from './../../../services/user.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Signal } from '@angular/core';

import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task.model';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { ITEMS_PER_PAGE } from '../../../utils/constants/constants';
import { Pagination } from '../../../utils/interfaces/interfaces';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, TaskCreateComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  private taskService = inject(TasksService);
  tasks: Signal<Task[]> = this.taskService.tasks;
  totalCount: Signal<number> = this.taskService.totalCount;
  selectedTask: Task = {} as Task;
  pageSize: number = ITEMS_PER_PAGE;
  currentPage = 1;
  showModal: boolean = false;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.taskService.getTasks(this.currentPage, this.pageSize);
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
    this.taskService.deleteTask(id);
  }

  onPageChanged(event: Pagination) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageSize;
    this.taskService.getTasks(event.currentPage, this.pageSize);
  }

  onCountChange(event: Pagination) {
    this.pageSize = event.pageSize;
    this.currentPage = event.currentPage;
    this.taskService.getTasks(this.currentPage, this.pageSize);
  }
}

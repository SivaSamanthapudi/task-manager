import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Signal } from '@angular/core';

import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task.model';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { UserService } from '../../../services/user.service';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { ITEMS_PER_PAGE } from '../../../utils/constants/constants';

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
  itemsPerPage: number = ITEMS_PER_PAGE;
  showModal: boolean;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.taskService.getTasks();
    this.userService.getUsers();
  }

  onEdit(task: Task) {
    this.selectedTask = { ...task, dueBy: this.formatDateForInput(task.dueBy) };
    this.showModal = true;
  }

  formatDateForInput(date: string | Date): string {
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

  onPageChanged(event: any) {
    const pageNumber = event;
    this.taskService.getTasks(pageNumber, this.itemsPerPage);
  }
}

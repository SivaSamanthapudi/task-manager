import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Signal } from '@angular/core';

import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task.model';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  private taskService = inject(TasksService);
  tasks: Signal<Task[]> = this.taskService.tasks;
  editedTask: Task = {} as Task;
  itemsPerPage: number = 5;
  totalTasks: number;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.taskService.getTasks();
    this.userService.getUsers();
    this.totalTasks = this.taskService.totalCount();
  }


  onEdit(task: Task) {
    this.editedTask = { ...task, dueBy: this.formatDateForInput(task.dueBy) };
    console.log(this.editedTask);
  }

  formatDateForInput(date: string | Date): string {
    if(!date){
      return null;
    }
    const d = new Date(date);
    // Extract YYYY-MM-DD
    return d.toISOString().split('T')[0];
  }

  onDismiss() {
    this.editedTask = {} as Task;
  }

  onUpdate() {
    this.editedTask = { ...this.editedTask, updatedOn: new Date() };
    this.taskService.updateTask(this.editedTask);
  }

  onDelete(id: string) {
    this.taskService.deleteTask(id);
  }

  onPageChanged(event: any) {
    console.log(event);
    const pageNumber = event;
    this.taskService.getTasks(pageNumber, this.itemsPerPage);
  }
}

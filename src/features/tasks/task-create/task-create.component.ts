import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class TaskCreateComponent {
  @Output() close = new EventEmitter<void>();

  constructor(public taskService: TasksService) {}

  onAddTask(form: NgForm) {
    this.taskService.addTask(form.value.title, form.value.description, null, form.value.dueBy);
    form.resetForm();
    this.close.emit();
  }
}

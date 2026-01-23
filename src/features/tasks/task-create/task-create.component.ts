import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class TaskCreateComponent {
  @Output() close = new EventEmitter<void>();
  @Input() isEdit = false;
  @Input() task: Task = {
    title: '',
    description: '',
    updatedOn: null,
    dueBy: '',
    createdAt: null,
  };

  constructor(public taskService: TasksService) {}

  onSave(form: NgForm) {
    if (this.isEdit) {
      const selectedTask = { ...this.task, updatedOn: new Date() };
      this.taskService.updateTask(selectedTask);
    } else {
      this.taskService.addTask(this.task.title, this.task.description, null, this.task.dueBy);
    }
    form.resetForm();
    this.close.emit();
  }

  reset(taskForm: NgForm) {
    taskForm.reset();
  }
}

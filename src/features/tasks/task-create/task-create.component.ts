import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { Store } from '@ngrx/store';
import * as TasksActions from '../../../app/state/tasks/tasks.actions';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  imports: [FormsModule, CommonModule, ModalComponent],
  standalone: true,
})
export class TaskCreateComponent {
  private store = inject(Store);
  @Output() close = new EventEmitter<void>();
  @Input() isEdit = false;
  @Input() task: Task = {
    title: '',
    description: '',
    updatedOn: null,
    dueBy: '',
    createdAt: null,
  };

  constructor() {}

  onSave(form: NgForm) {
    if (this.isEdit) {
      const selectedTask = { ...this.task, updatedOn: new Date() };
      this.store.dispatch(TasksActions.updateTask({ task: selectedTask }));
    } else {
      const newTask: Task = {
        title: this.task.title,
        description: this.task.description,
        createdAt: new Date(),
        updatedOn: null,
        dueBy: this.task.dueBy ?? null,
      };
      this.store.dispatch(TasksActions.addTask({ task: newTask }));
    }
    form.resetForm();
    this.close.emit();
  }

  reset(taskForm: NgForm) {
    taskForm.reset();
  }
}

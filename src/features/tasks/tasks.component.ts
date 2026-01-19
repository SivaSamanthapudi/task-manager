import { Component } from '@angular/core';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskCreateComponent, TaskListComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  isModalOpen: boolean;

constructor() {}

  onAddTask(){
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}

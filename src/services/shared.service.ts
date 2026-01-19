import { Injectable } from '@angular/core';
import { PostsService } from './posts.service';
import { TasksService } from './tasks.service';

@Injectable({ providedIn: 'root' })
export class SharedService {
  constructor(
    private postService: PostsService,
    private taskService: TasksService,
  ) {}

  clearCache() {
    this.postService.clearPostsCache();
    this.taskService.clearTasksCache();
    // Implement cache clearing logic if needed
  }
}

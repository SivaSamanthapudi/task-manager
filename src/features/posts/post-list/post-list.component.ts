import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Signal } from '@angular/core';

import { Post } from '../../../models/post.model';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  private postsService = inject(PostsService);
  posts: Signal<Post[]> = this.postsService.posts;
  editedPost: Post = {} as Post;

  constructor() {}

  ngOnInit() {
    this.postsService.getPosts();
  }

  onEdit(post: Post) {
    this.editedPost = {...post};
  }

  onDismiss() {
    this.editedPost = {} as Post;
  }

  onUpdate() {
    this.postsService.updatePost(this.editedPost);
  }

  onDelete(id: string) {
    this.postsService.deletePost(id);
  }
}

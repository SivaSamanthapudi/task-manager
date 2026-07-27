import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Post } from '../../../models/post.model';
import { Store } from '@ngrx/store';
import * as PostsActions from '../../../app/state/posts/posts.actions';
import * as PostsSelectors from '../../../app/state/posts/posts.selectors';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  private store = inject(Store);
  posts = signal<Post[]>([]);
  editedPost: Post = {} as Post;

  constructor() {}

  ngOnInit() {
    this.store.select(PostsSelectors.selectAllPosts).subscribe((posts) => this.posts.set(posts));
    this.store.dispatch(PostsActions.loadPosts());
  }

  onEdit(post: Post) {
    this.editedPost = { ...post };
  }

  onDismiss() {
    this.editedPost = {} as Post;
  }

  onUpdate() {
    this.store.dispatch(PostsActions.updatePost({ post: this.editedPost }));
  }

  onDelete(id: string) {
    this.store.dispatch(PostsActions.deletePost({ id }));
  }
}

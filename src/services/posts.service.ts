import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { POSTS_API_URL } from '../utils/constants/url.constants';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private _posts = signal<Post[]>([]);
  posts = this._posts.asReadonly();

  constructor(private http: HttpClient) {}

  // Observable-based APIs for NgRx Effects
  fetchPosts$() {
    return this.http.get<{ message: string; posts: any[] }>(POSTS_API_URL).pipe(
      map((res) =>
        res.posts.map((p) => ({
          id: p.id,
          title: p.title,
          content: p.content,
        })),
      ),
    );
  }

  addPost$(post: Post) {
    return this.http.post<{ message: string; post: Post }>(POSTS_API_URL, post).pipe(map((r) => r.post));
  }

  updatePost$(post: Post) {
    return this.http.put(`${POSTS_API_URL}/${post.id}`, post).pipe(map(() => post));
  }

  deletePost$(id: string) {
    return this.http.delete(`${POSTS_API_URL}/${id}`).pipe(map(() => id));
  }

  // Existing signal-based APIs remain for backward compatibility
  getPosts() {
    this.fetchPosts$().subscribe((posts) => this._posts.set(posts));
  }

  addPost(title: string, content: string, createdAt: Date) {
    const post: Post = { title, content, createdAt };
    this.addPost$(post).subscribe((resPost) => this._posts.update((posts) => [...posts, resPost]));
  }

  updatePost(post: Post) {
    const updatedPost: Post = post;
    this.updatePost$(updatedPost).subscribe(() => {
      this._posts.update((posts) => this.updatePostList(posts, updatedPost));
    });
  }

  deletePost(id: string) {
    this.deletePost$(id).subscribe(() => this._posts.update((posts) => posts.filter((p) => p.id !== id)));
  }

  clearPostsCache(){
    this._posts.set([]);
  }

  private replacePost(post: Post, updatedPost: Post): Post {
    return post.id === updatedPost.id ? updatedPost : post;
  }

  private updatePostList(posts: Post[], updatedPost: Post): Post[] {
    return posts.map((post) => this.replacePost(post, updatedPost));
  }

}

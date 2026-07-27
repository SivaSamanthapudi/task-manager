import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PostsActions from './posts.actions';
import { PostsService } from '../../../services/posts.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      mergeMap(() =>
        this.postsService.fetchPosts$().pipe(
          map((posts) => PostsActions.loadPostsSuccess({ posts })),
          catchError((error) => of(PostsActions.loadPostsFailure({ error }))),
        ),
      ),
    ),
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.addPost),
      mergeMap((action) =>
        this.postsService.addPost$(action.post).pipe(
          map((post) => PostsActions.addPostSuccess({ post })),
          catchError((error) => of(PostsActions.addPostFailure({ error }))),
        ),
      ),
    ),
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.updatePost),
      mergeMap((action) =>
        this.postsService.updatePost$(action.post).pipe(
          map((post) => PostsActions.updatePostSuccess({ post })),
          catchError((error) => of(PostsActions.updatePostFailure({ error }))),
        ),
      ),
    ),
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.deletePost),
      mergeMap((action) =>
        this.postsService.deletePost$(action.id).pipe(
          map((id) => PostsActions.deletePostSuccess({ id })),
          catchError((error) => of(PostsActions.deletePostFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}

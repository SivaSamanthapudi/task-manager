import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPosts from './posts.reducer';

export const selectPostsState = createFeatureSelector<fromPosts.State>(fromPosts.postsFeatureKey);

export const selectAllPosts = createSelector(selectPostsState, fromPosts.selectAll);
export const selectPostsLoading = createSelector(selectPostsState, (s) => s.loading);
export const selectPostsError = createSelector(selectPostsState, (s) => s.error);

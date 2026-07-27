import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as PostsActions from './posts.actions';
import { Post } from '../../../models/post.model';

export const postsFeatureKey = 'posts';

export interface State extends EntityState<Post> {
  loading: boolean;
  error: any | null;
}

export const adapter = createEntityAdapter<Post>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
});

export const postsReducer = createReducer(
  initialState,
  on(PostsActions.loadPosts, (state) => ({ ...state, loading: true })),
  on(PostsActions.loadPostsSuccess, (state, { posts }) => adapter.setAll(posts, { ...state, loading: false })),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(PostsActions.addPostSuccess, (state, { post }) => adapter.addOne(post, state)),
  on(PostsActions.updatePostSuccess, (state, { post }) => adapter.upsertOne(post, state)),
  on(PostsActions.deletePostSuccess, (state, { id }) => adapter.removeOne(id, state)),
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

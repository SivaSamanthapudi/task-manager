import { Post } from '../models/post.model';
import { Request, Response } from 'express';

export const addPost = async (req: Request, res: Response) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      createdAt: req.body?.createdAt ?? null,
    });

    const createdPost = await post.save();

    res.status(201).json({
      message: 'Post added successfully',
      code: 'POST_ADD_SUCCESS',
      post: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
      },
    });
  } catch (err) {
    res.status(500).json({ code: 'POST_ADD_FAILED', message: 'Creating post failed' });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    posts.map((post) => ({
      id: post._id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
    }));

    res.status(200).json({
      message: 'Posts fetched successfully',
      code: 'POST_FETCH_SUCCESS',
      posts,
    });
  } catch {
    res.status(500).json({
      code: 'POST_FETCH_FAILED',
      message: 'Post fetching failed',
    });
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    const post = {
      _id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      createdAt: req.body.createdAt,
    };

    await Post.updateOne({ _id: req.params.id }, post);

    res.status(200).json({
      code: 'POST_UPDATE_SUCCESS',
      message: 'Post updated successfully',
    });
  } catch {
    res.status(500).json({
      code: 'POST_UPDATE_FAILED',
      message: 'Updating post failed',
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: 'Post deleted successfully',
      code: 'POST_DELETE_SUCCESS',
    });
  } catch {
    res.status(500).json({
      code: 'POST_DELETE_FAILED',
      message: 'Deleting post failed',
    });
  }
};

const Post = require('../models/post.model');

exports.addPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      createdAt: req.body?.createdAt ?? null,
    });

    const createdPost = await post.save();

    res.status(201).json({
      message: 'Post added successfully',
      post: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Creating post failed' });
  }
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  posts.map((post) => ({
    id: post._id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
  }));

  res.status(200).json({
    message: 'Posts fetched successfully',
    posts,
  });
};

exports.editPost = async (req, res) => {
  try {
    const post = {
      _id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      createdAt: req.body.createdAt,
    };

    await Post.updateOne({ _id: req.params.id }, post);

    res.status(200).json({ message: 'Post updated successfully' });
  } catch {
    res.status(500).json({ message: 'Updating post failed' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Post deleted' });
  } catch {
    res.status(500).json({ message: 'Deleting post failed' });
  }
};

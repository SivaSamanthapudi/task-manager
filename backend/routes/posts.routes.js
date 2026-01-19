const express = require('express');

const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const checkAuth = require('../middleware/check-auth');

router.post('', checkAuth, postCtrl.addPost);
router.get('', checkAuth, postCtrl.getAllPosts);
router.put('/:id', checkAuth, postCtrl.editPost);
router.delete('/:id', checkAuth, postCtrl.deletePost);

module.exports = router;

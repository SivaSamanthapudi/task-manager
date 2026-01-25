import { Router } from 'express';
import { checkAuth } from '../middleware/check-auth';
import * as postCtrl from '../controllers/post.controller';

const router = Router();

router.post('', checkAuth, postCtrl.addPost);
router.get('', checkAuth, postCtrl.getAllPosts);
router.put('/:id', checkAuth, postCtrl.editPost);
router.delete('/:id', checkAuth, postCtrl.deletePost);

export default router;
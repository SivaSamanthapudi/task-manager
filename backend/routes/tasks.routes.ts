import { Router } from 'express';
import { checkAuth } from '../middleware/check-auth';
import * as taskCtrl from '../controllers/task.controller';

const router = Router();
router.post('', checkAuth, taskCtrl.addTask);
router.get('', checkAuth, taskCtrl.getAllTasks);
router.put('/:id', checkAuth, taskCtrl.updateTask);
router.delete('/:id', checkAuth, taskCtrl.deleteTask);

export default router;
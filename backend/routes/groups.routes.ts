import { Router } from 'express';
import { checkAuth } from '../middleware/check-auth';
import * as groupCtrl from '../controllers/groups.controller';

const router = Router();

router.post('', checkAuth, groupCtrl.addGroup);
router.get('', checkAuth, groupCtrl.getGroups);
// router.put('/:id', checkAuth, groupCtrl.editGroup);
// router.delete('/:id', checkAuth, groupCtrl.deleteGroup);

export default router;

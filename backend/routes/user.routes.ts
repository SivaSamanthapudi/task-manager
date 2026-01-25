import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';
import { checkAuth } from '../middleware/check-auth';

const router = Router();

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('', checkAuth, userCtrl.getAllUsers);
router.put('/update/:id', checkAuth, userCtrl.updateUser); // Added missing /
router.delete('/:id', checkAuth, userCtrl.deleteUser);

export default router;
const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const checkAuth = require('../middleware/check-auth');

// Much easier to read at a glance
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('', checkAuth, userCtrl.getAllUsers);
router.put('update/:id', checkAuth, userCtrl.updateUser);
router.delete('/:id', checkAuth, userCtrl.deleteUser);

module.exports = router;

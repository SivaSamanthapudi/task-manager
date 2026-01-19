const express = require('express');

const router = express.Router();
const taskCtrl = require('../controllers/task.controller');
const checkAuth = require('../middleware/check-auth');

router.post('', checkAuth, taskCtrl.addTask);
router.get('', checkAuth, taskCtrl.getAllTasks);
router.put('/:id', checkAuth, taskCtrl.updateTask);
router.delete('/:id', checkAuth, taskCtrl.deleteTask);

module.exports = router;

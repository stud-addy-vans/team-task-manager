const express = require('express');
const { createTask, getTasks, updateTaskStatus } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protection to all task routes
router.route('/').post(protect, createTask);
router.route('/:projectId').get(protect, getTasks);
router.route('/:id').put(protect, updateTaskStatus);

module.exports = router;
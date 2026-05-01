const Task = require('../models/Task');

const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get all tasks assigned to the user
        const tasks = await Task.find({ assignedTo: userId });

        const totalTasks = tasks.length;
        const tasksByStatus = {
            todo: tasks.filter(t => t.status === 'To Do').length,
            inProgress: tasks.filter(t => t.status === 'In Progress').length,
            done: tasks.filter(t => t.status === 'Done').length,
        };

        // Check for overdue tasks
        const today = new Date();
        const overdueTasks = tasks.filter(t =>
            t.dueDate && new Date(t.dueDate) < today && t.status !== 'Done'
        ).length;

        res.status(200).json({
            totalTasks,
            tasksByStatus,
            overdueTasks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardStats };
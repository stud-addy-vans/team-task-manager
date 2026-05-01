const Project = require('../models/Project');

const createProject = async (req, res) => {
    try {
        const { name } = req.body;
        
        const project = await Project.create({
            name,
            admin: req.user._id,
            members: [req.user._id] // Admin is also a member by default
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            $or: [{ admin: req.user._id }, { members: req.user._id }]
        }).populate('admin', 'name email').populate('members', 'name email');
        
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProject, getProjects };
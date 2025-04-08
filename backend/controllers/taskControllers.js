const Task = require('../models/taskModel');

exports.getTasks = async (req, res) => {
    try {
        const { priority, due_date } = req.query;
        const tasks = await Task.getAll({ priority, due_date });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const task = req.body;
        const id = await Task.create(task);
        res.status(201).json({ id, message: 'Công việc đã được thêm' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = req.body;
        const affectedRows = await Task.update(id, task);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Công việc không tồn tại' });
        }
        res.json({ message: 'Công việc đã được cập nhật' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Task.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Công việc không tồn tại' });
        }
        res.json({ message: 'Công việc đã được xóa' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
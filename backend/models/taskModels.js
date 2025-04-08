const db = require('../config/database');

const Task = {
    getAll: async (filters = {}) => {
        let query = `
            SELECT id, title, description, status, priority, due_date
            FROM tasks
        `;
        const params = [];

        if (filters.priority || filters.due_date) {
            query += ' WHERE';
            if (filters.priority) {
                query += ' priority = ?';
                params.push(filters.priority);
            }
            if (filters.due_date) {
                query += filters.priority ? ' AND' : '';
                query += ' DATE(due_date) = ?';
                params.push(filters.due_date);
            }
        }
        query += ' ORDER BY created_at DESC';

        const [rows] = await db.query(query, params);
        return rows;
    },

    create: async (task) => {
        const { title, description, status, priority, due_date } = task;
        const [result] = await db.query(
            'INSERT INTO tasks (title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)',
            [title, description, status, priority, due_date]
        );
        return result.insertId;
    },

    update: async (id, task) => {
        const { title, description, status, priority, due_date } = task;
        const [result] = await db.query(
            'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ? WHERE id = ?',
            [title, description, status, priority, due_date, id]
        );
        return result.affectedRows;
    },

    delete: async (id) => {
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        return result.affectedRows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
        return rows[0];
    }
};

module.exports = Task;
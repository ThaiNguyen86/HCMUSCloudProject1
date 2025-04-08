const db = require('../config/database');

const Task = {
    // Lấy tất cả công việc, hỗ trợ lọc
    getAll: async (filters = {}) => {
        let query = `
            SELECT t.id, t.title, t.description, t.status, t.priority, t.due_date, c.name AS category
            FROM tasks t
            LEFT JOIN categories c ON t.category_id = c.id
        `;
        const params = [];

        if (filters.priority || filters.due_date) {
            query += ' WHERE';
            if (filters.priority) {
                query += ' t.priority = ?';
                params.push(filters.priority);
            }
            if (filters.due_date) {
                query += filters.priority ? ' AND' : '';
                query += ' DATE(t.due_date) = ?';
                params.push(filters.due_date);
            }
        }
        query += ' ORDER BY t.created_at DESC';

        const [rows] = await db.query(query, params);
        return rows;
    },

    // Thêm công việc mới
    create: async (task) => {
        const { title, description, status, priority, due_date, category_id } = task;
        const [result] = await db.query(
            'INSERT INTO tasks (title, description, status, priority, due_date, category_id) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, status, priority, due_date, category_id]
        );
        return result.insertId;
    },

    // Cập nhật công việc
    update: async (id, task) => {
        const { title, description, status, priority, due_date, category_id } = task;
        const [result] = await db.query(
            'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, category_id = ? WHERE id = ?',
            [title, description, status, priority, due_date, category_id, id]
        );
        return result.affectedRows;
    },

    // Xóa công việc
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        return result.affectedRows;
    },

    // Lấy công việc theo ID
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
        return rows[0];
    }
};

module.exports = Task;
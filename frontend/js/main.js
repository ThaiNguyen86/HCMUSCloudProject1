import { getTasks, createTask, updateTask, deleteTask } from './api.js';
import { renderTasks, populateForm, resetForm, toggleTaskForm } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');

    window.loadTasks = async () => {
        try {
            const priority = document.getElementById('filter-priority').value;
            const due_date = document.getElementById('filter-due-date').value;
            const filters = {};
            if (priority) filters.priority = priority;
            if (due_date) filters.due_date = due_date;

            const tasks = await getTasks(filters);
            renderTasks(tasks);
        } catch (error) {
            console.error('Lỗi khi tải danh sách công việc:', error.message);
            alert('Không thể tải danh sách công việc. Vui lòng thử lại sau.');
        }
    };

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const task = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            status: document.getElementById('status').value,
            priority: document.getElementById('priority').value,
            due_date: document.getElementById('due_date').value || null,
        };
        const taskId = document.getElementById('task-id').value;

        try {
            if (taskId) {
                await updateTask(taskId, task);
                alert('Công việc đã được cập nhật!');
            } else {
                await createTask(task);
                alert('Công việc đã được thêm!');
            }
            resetForm();
            loadTasks();
        } catch (error) {
            console.error('Lỗi khi lưu công việc:', error.message);
            alert('Không thể lưu công việc. Vui lòng thử lại sau.');
        }
    });

    window.editTask = async (id) => {
        try {
            const tasks = await getTasks();
            const task = tasks.find(t => t.id === id);
            if (task) {
                populateForm(task);
            }
        } catch (error) {
            console.error('Lỗi khi tải công việc để chỉnh sửa:', error.message);
            alert('Không thể tải công việc. Vui lòng thử lại sau.');
        }
    };

    window.deleteTask = async (id) => {
        if (confirm('Bạn có chắc muốn xóa công việc này?')) {
            try {
                await deleteTask(id);
                alert('Công việc đã được xóa!');
                loadTasks();
            } catch (error) {
                console.error('Lỗi khi xóa công việc:', error.message);
                alert('Không thể xóa công việc. Vui lòng thử lại sau.');
            }
        }
    };

    window.toggleTaskForm = toggleTaskForm;

    loadTasks();
});
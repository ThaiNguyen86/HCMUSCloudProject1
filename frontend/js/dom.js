export function renderTasks(tasks) {
    const taskList = document.getElementById('task-list');

    if (tasks.length === 0) {
        taskList.innerHTML = `<p class="text-center text-muted">Không có công việc nào.</p>`;
        return;
    }

    taskList.innerHTML = `
        <div class="table-responsive">
            <table class="table table-bordered table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>Tên công việc</th>
                        <th>Mô tả</th>
                        <th>Trạng thái</th>
                        <th>Ưu tiên</th>
                        <th>Hạn hoàn thành</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    ${tasks.map(task => `
                        <tr data-id="${task.id}">
                            <td>${task.title}</td>
                            <td>${task.description || ''}</td>
                            <td>${task.status}</td>
                            <td>${task.priority}</td>
                            <td>${task.due_date ? new Date(task.due_date).toLocaleString('vi-VN') : 'Không có'}</td>
                            <td>
                                <button class="btn btn-sm btn-secondary me-1" onclick="editTask(${task.id})">Sửa</button>
                                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Xóa</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

export function populateForm(task) {
    document.getElementById('task-id').value = task.id || '';
    document.getElementById('title').value = task.title || '';
    document.getElementById('description').value = task.description || '';
    document.getElementById('status').value = task.status || 'Cần làm';
    document.getElementById('priority').value = task.priority || 'Trung bình';
    document.getElementById('due_date').value = task.due_date ? new Date(task.due_date).toISOString().slice(0, 16) : '';
    document.querySelector('#task-form button').textContent = task.id ? 'Cập nhật' : 'Thêm công việc';
    // Hiển thị form khi chỉnh sửa
    document.getElementById('task-form').style.display = 'block';
}

export function resetForm() {
    document.getElementById('task-form').reset();
    document.getElementById('task-id').value = '';
    document.querySelector('#task-form button').textContent = 'Thêm công việc';
    // Ẩn form sau khi reset
    document.getElementById('task-form').style.display = 'none';
}

// Hàm để hiển thị/ẩn form
export function toggleTaskForm() {
    const form = document.getElementById('task-form');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}
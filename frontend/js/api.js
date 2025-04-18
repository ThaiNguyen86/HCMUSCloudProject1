const API_URL = 'http://project1-taskmanager-asg-1-317068115.ap-southeast-1.elb.amazonaws.com';

export async function getTasks(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/tasks${query ? `?${query}` : ''}`);
    if (!response.ok) {
        throw new Error(`Lỗi khi lấy danh sách công việc: ${response.statusText}`);
    }
    return response.json();
}

export async function createTask(task) {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error(`Lỗi khi tạo công việc: ${response.statusText}`);
    }
    return response.json();
}

export async function updateTask(id, task) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error(`Lỗi khi cập nhật công việc: ${response.statusText}`);
    }
    return response.json();
}

export async function deleteTask(id) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Lỗi khi xóa công việc: ${response.statusText}`);
    }
    return response.json();
}
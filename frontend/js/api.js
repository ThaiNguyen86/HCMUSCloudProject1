const API_URL = 'http://localhost:3000';

export async function getTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    return response.json();
}

export async function createTask(task) {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    return response.json();
}

// Thêm hàm cho PUT, DELETE tương tự
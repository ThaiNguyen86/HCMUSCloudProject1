export function renderTasks(tasks) {
    const app = document.getElementById('task-app');
    app.innerHTML = tasks.map(task => `
        <div class="task" data-id="${task.id}">
            <h2>${task.title}</h2>
            <p>${task.description || ''}</p>
        </div>
    `).join('');
}
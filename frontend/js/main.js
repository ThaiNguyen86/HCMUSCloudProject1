import { getTasks, createTask } from './api.js';
import { renderTasks } from './dom.js';

async function init() {
    const tasks = await getTasks();
    renderTasks(tasks);
}

init();
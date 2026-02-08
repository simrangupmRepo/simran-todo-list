// To-Do List Manager - ArrayList/Collections style with dynamic data
class TodoList {
  constructor() {
    this.tasks = [];
  }

  add(task) {
    const trimmed = (task || '').trim();
    if (!trimmed) return false;
    this.tasks.push({ id: Date.now(), text: trimmed });
    return true;
  }

  delete(id) {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.tasks.splice(idx, 1);
    return true;
  }

  getAll() {
    return [...this.tasks];
  }

  getCount() {
    return this.tasks.length;
  }
}

const todo = new TodoList();

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

function renderTasks() {
  const items = todo.getAll();
  taskCount.textContent = `${items.length} task${items.length !== 1 ? 's' : ''}`;

  if (items.length === 0) {
    taskList.innerHTML = '<p class="empty-state">No tasks yet. Add one above!</p>';
    return;
  }

  taskList.innerHTML = items.map(item => `
    <div class="task-item" data-id="${item.id}">
      <span class="task-text">${escapeHtml(item.text)}</span>
      <button class="btn btn-delete" data-id="${item.id}">Delete</button>
    </div>
  `).join('');

  taskList.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      todo.delete(id);
      renderTasks();
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

addBtn.addEventListener('click', () => {
  if (todo.add(taskInput.value)) {
    taskInput.value = '';
    renderTasks();
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (todo.add(taskInput.value)) {
      taskInput.value = '';
      renderTasks();
    }
  }
});

renderTasks();

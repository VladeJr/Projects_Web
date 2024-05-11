document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('todo-form');
  const taskList = document.getElementById('task-list');
  const visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 0;

  localStorage.setItem('visitCount', visitCount + 1);
  alert(`Esta página foi visitada ${visitCount + 1} vezes.`);

  form.addEventListener('submit', function (e) {
      e.preventDefault();
      const title = document.getElementById('task-title').value.trim();
      const description = document.getElementById('task-desc').value.trim();
      if (title && description) {
          const task = { title, description };
          addTaskToList(task);
          saveTask(task);
          form.reset();
      }
  });

  function addTaskToList(task) {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${task.title}</strong><p>${task.description}</p>`;
      taskList.appendChild(li);
  }

  function saveTask(task) {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTaskToList(task));
  }

  loadTasks();
});

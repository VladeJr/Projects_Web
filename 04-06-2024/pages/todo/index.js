const taskKey = '@tasks'

let selectedTaskId = null

function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskId = new Date().getTime()
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const li = document.createElement('li')

  li.id = `id-${taskId}`
  li.innerHTML = `
    <div>
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
    </div>
    <button title="Editar tarefa" onclick="openEditDialog(${taskId})">✏️</button>
    <button title="Excluir tarefa" onclick="deleteTask(${taskId})">❌</button>
  `

  taskList.appendChild(li)

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({
    id: taskId,
    title: taskTitle,
    description: taskDescription,
  })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []

  selectedTaskId = tasks.findIndex((task) => task.id === taskId)
  const task = tasks[selectedTaskId]

  const dialog = document.querySelector('#editDialog')

  const editTitle = document.querySelector('#editTitle')
  const editDescription = document.querySelector('#editDescription')

  editTitle.value = task.title
  editDescription.value = task.description

  dialog.showModal()
}

function closeDialog() {
  const dialog = document.querySelector('#editDialog')
  dialog.close()
}

function updateTask(event) {
  event.preventDefault()

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []

  const editTitle = document.querySelector('#editTitle').value
  const editDescription = document.querySelector('#editDescription').value

  tasks[selectedTaskId] = {
    ...tasks[selectedTaskId],
    title: editTitle,
    description: editDescription,
  }

  localStorage.setItem(taskKey, JSON.stringify(tasks))
  renderTasks()
  closeDialog()
}

function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem(taskKey)) || []

  tasks = tasks.filter((task) => task.id !== taskId)
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  renderTasks()
}

function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')

  taskList.innerHTML = tasks
    .map(
      (task) => `
      <li id='id-${task.id}'>
        <div>
          <h2>${task.title}</h2>
          <p>${task.description}</p>
        </div>
        <button title="Editar tarefa" onclick="openEditDialog(${task.id})">✏️</button>
        <button title="Excluir tarefa" onclick="deleteTask(${task.id})">❌</button>
      </li>
    `
    )
    .join('')
}

window.addEventListener('DOMContentLoaded', () => {
  renderTasks()
})

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault();  

        const newTodo = todoInput.value.trim(); 

        if (newTodo) {
            addTodoToLocalStorage(newTodo);
            displayTodo(newTodo);
            todoInput.value = '';  
        }
    });

    function addTodoToLocalStorage(todo) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function displayTodo(todo) {
        const todoElement = document.createElement('div');
        todoElement.textContent = todo;
        todoList.appendChild(todoElement);
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => displayTodo(todo));
    }

    loadTodos();  s
});

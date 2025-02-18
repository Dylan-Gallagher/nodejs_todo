// app.js
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Fetch todos from the server
    fetchTodos();

    // Add todo
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText) {
            addTodo({ id: Date.now().toString(), text: todoText });
            todoInput.value = '';
        }
    });

    // Fetch todos from the server
    function fetchTodos() {
        fetch('/todos')
            .then(response => response.json())
            .then(todos => {
                todoList.innerHTML = '';
                todos.forEach(todo => renderTodo(todo));
            });
    }

    // Add todo to the server
    function addTodo(todo) {
        fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
        .then(response => response.json())
        .then(() => fetchTodos());
    }

    // Delete todo from the server
    function deleteTodo(id) {
        fetch(`/todos/${id}`, {
            method: 'DELETE'
        })
        .then(() => fetchTodos());
    }

    // Render todo item
    function renderTodo(todo) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="deleteTodo('${todo.id}')">Delete</button>
        `;
        todoList.appendChild(li);
    }

    // Expose deleteTodo to the global scope
    window.deleteTodo = deleteTodo;
});

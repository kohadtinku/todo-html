document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // Load existing to-dos from localStorage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const addTodo = (text) => {
        const todo = {
            id: Date.now(),
            text,
        };
        todos.push(todo);
        saveTodos();
        renderTodos();
    };

    const deleteTodo = (id) => {
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }
    };

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';

            const span = document.createElement('span');
            span.textContent = todo.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteTodo(todo.id);

            li.appendChild(span);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    };

    addBtn.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
            addTodo(text);
            todoInput.value = '';
        }
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = todoInput.value.trim();
            if (text) {
                addTodo(text);
                todoInput.value = '';
            }
        }
    });

    renderTodos();
});

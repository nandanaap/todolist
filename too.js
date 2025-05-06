// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const notesTextarea = document.getElementById('notes');
const saveNoteBtn = document.getElementById('save-note-btn');

// Clock Elements
const dateElement = document.getElementById('date');
const dayElement = document.getElementById('day');
const timeElement = document.getElementById('time');

// Load saved data from localStorage
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    loadNotes();
    updateClock();
    // Update clock every second
    setInterval(updateClock, 1000);
});

// Clock functionality
function updateClock() {
    const now = new Date();
    
    // Format date: May 5, 2025
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
    
    // Format day: Monday
    const dayOptions = { weekday: 'long' };
    dayElement.textContent = now.toLocaleDateString('en-US', dayOptions);
    
    // Format time: 12:30:45 PM
    timeElement.textContent = now.toLocaleTimeString('en-US');
}

// Add task functionality
addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === '') return;
    
    // Create new task item
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    // Add checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-2';
    checkbox.addEventListener('change', function() {
        toggleTaskCompletion(this, taskTextSpan);
    });
    
    // Add task text
    const taskTextSpan = document.createElement('span');
    taskTextSpan.className = 'flex-grow-1';
    taskTextSpan.textContent = taskText;
    
    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        deleteTask(li, taskText);
    });
    
    // Assemble task item
    li.appendChild(checkbox);
    li.appendChild(taskTextSpan);
    li.appendChild(deleteBtn);
    
    // Add to list
    todoList.appendChild(li);
    
    // Save to localStorage
    saveTodo(taskText);
    
    // Clear input
    todoInput.value = '';
    todoInput.focus();
}

function toggleTaskCompletion(checkbox, textElement) {
    if (checkbox.checked) {
        textElement.style.textDecoration = 'line-through';
        textElement.style.color = '#6c757d';
    } else {
        textElement.style.textDecoration = 'none';
        textElement.style.color = '';
    }
    
    // Update localStorage with completion status
    updateTodoStatus(textElement.textContent, checkbox.checked);
}

function deleteTask(taskElement, taskText) {
    // Remove from DOM
    taskElement.remove();
    
    // Remove from localStorage
    removeTodo(taskText);
}

// Notes functionality
saveNoteBtn.addEventListener('click', saveNote);

function saveNote() {
    const notesContent = notesTextarea.value.trim();
    if (notesContent) {
        localStorage.setItem('todoAppNotes', notesContent);
        // Show a brief save confirmation
        saveNoteBtn.textContent = 'Saved!';
        setTimeout(() => {
            saveNoteBtn.textContent = 'Save Note';
        }, 1000);
    }
}

function loadNotes() {
    const savedNotes = localStorage.getItem('todoAppNotes');
    if (savedNotes) {
        notesTextarea.value = savedNotes;
    }
}

// localStorage functions for todos
function saveTodo(taskText) {
    let todos = getTodosFromStorage();
    todos.push({
        text: taskText,
        completed: false
    });
    localStorage.setItem('todoAppTasks', JSON.stringify(todos));
}

function updateTodoStatus(taskText, isCompleted) {
    let todos = getTodosFromStorage();
    const index = todos.findIndex(todo => todo.text === taskText);
    if (index !== -1) {
        todos[index].completed = isCompleted;
        localStorage.setItem('todoAppTasks', JSON.stringify(todos));
    }
}

function removeTodo(taskText) {
    let todos = getTodosFromStorage();
    todos = todos.filter(todo => todo.text !== taskText);
    localStorage.setItem('todoAppTasks', JSON.stringify(todos));
}

function getTodosFromStorage() {
    const storedTodos = localStorage.getItem('todoAppTasks');
    return storedTodos ? JSON.parse(storedTodos) : [];
}

function loadTodos() {
    const todos = getTodosFromStorage();
    
    todos.forEach(todo => {
        // Create new task item
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        // Add checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input me-2';
        checkbox.checked = todo.completed;
        
        // Add task text
        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'flex-grow-1';
        taskTextSpan.textContent = todo.text;
        
        // Apply styling for completed tasks
        if (todo.completed) {
            taskTextSpan.style.textDecoration = 'line-through';
            taskTextSpan.style.color = '#6c757d';
        }
        
        // Add event listener for checkbox
        checkbox.addEventListener('change', function() {
            toggleTaskCompletion(this, taskTextSpan);
        });
        
        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            deleteTask(li, todo.text);
        });
        
        // Assemble task item
        li.appendChild(checkbox);
        li.appendChild(taskTextSpan);
        li.appendChild(deleteBtn);
        
        // Add to list
        todoList.appendChild(li);
    });
}
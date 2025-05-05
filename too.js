// JavaScript to manage the To-Do list and clock

// Function to update real-time clock
function updateClock() {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB'); // DD/MM/YYYY
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const time = now.toLocaleTimeString('en-US', { hour12: false });
  
    document.getElementById('date').textContent = `Date: ${date}`;
    document.getElementById('day').textContent = `Day: ${day}`;
    document.getElementById('time').textContent = `Time: ${time}`;
  }
  
  // To-Do List functionality
  document.getElementById('add-btn').addEventListener('click', () => {
    const todoInput = document.getElementById('todo-input');
    const task = todoInput.value.trim();
  
    if (task) {
      const ul = document.getElementById('todo-list');
      const li = document.createElement('li');
      li.textContent = task;
  
      // Add a remove button to each task
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'DONE';
      removeBtn.classList.add('remove-btn');
      removeBtn.onclick = () => li.remove();
  
      li.appendChild(removeBtn);
      ul.appendChild(li);
  
      todoInput.value = ''; // Clear input
    }
  });
  if (notesInput) {
    const ul = document.getElementById('');
    const li = document.createElement('li');
    li.textContent = notesInput;

    // Add a remove button to each task
    const removenotes = document.createElement('button');
    removenotes.textContent = 'Remove';
    removenotes.classList.add('remove-notes');
    removenotes.onclick = () => li.remove();

    li.appendChild(removenotes);
    ul.appendChild(li);

    todoInput.value = ''; // Clear input
  }
};

  
  // Initialize clock update every second
  setInterval(updateClock, 1000);
  updateClock(); // Call immediately on load
  // Save notes when the Save button is clicked
document.getElementById('save-note-btn').addEventListener('click', () => {
  localStorage.setItem('note', notesInput.value);
  alert('Note saved!');
});
// Save notes to localStorage
const notesInput = document.getElementById('notes');

// Load saved note on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedNote = localStorage.getItem('note');
  if (savedNote) {
    notesInput.value = savedNote;
  }
});

// Save note whenever user types
notesInput.addEventListener('input', () => {
  localStorage.setItem('note', notesInput.value);
});

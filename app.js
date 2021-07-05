// Initialise some variables
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
let todos = [];

const init = () => {
    // Get data from localstorage
    if(localStorage.getItem('todos') !== null) {
        todos = JSON.parse(localStorage.getItem('todos'));
        console.log(localStorage.getItem('todos'));
    }
    // If no todos yet add a starting todo
    if(todos.length === 0) {
        todos.push('Add some todos!');
        updateLocalStorage(todos);
    }
    // Generate intial markup
    todos.forEach(todo => {
        generateTemplate(todo);
    })
}

// Generate a todo template
const generateTemplate = todo => {
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>`;
    list.innerHTML += html;
}

// Bind event listener on submit of add todo form
addForm.addEventListener('submit', event => {
    event.preventDefault();
    // Get value
    const todo = addForm.add.value.trim();
    // If we have a value
    if(todo.length) {
        // Add to todos array
        todos.push(todo);
        // Update localstorage
        updateLocalStorage(todos);
        // Add markup for new todo
        generateTemplate(todo);
        // Reset the add todo form
        addForm.reset();
    }
})

// Bind event listener on list and check if element 
// was delete icon using event delegation
list.addEventListener('click', event => {
    // If this is a delete event
    if(event.target.classList.contains('delete')) {
        // Get the term from the todo
        let term = event.target.parentElement.textContent.trim();
        // Generate new array consisting of all values except the one we want to delete
        let filteredTodos = todos.filter(todo => todo !== term);
        // Pass this filtered array to localstorage
        updateLocalStorage(filteredTodos);
        // Remove element from markup
        event.target.parentElement.remove();
    }
})

// Function to search todos
const filterTodos = term => {
    // Look for all todos that do not match and add filtered class
    Array.from(list.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('filtered'));

    // Look for all todos that do match and remove the filtered class
    Array.from(list.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove('filtered'));
}

// Bind event listener for search box
search.addEventListener('keyup', () => {
    // Get current value from the form input
    const term = search.value.toLowerCase().trim();
    // Call the filterTodos function
    filterTodos(term);
});

// Add todos to localstorage
const updateLocalStorage = todos => {
    // Add the contents of the array as a JSON string
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Start the app
init();
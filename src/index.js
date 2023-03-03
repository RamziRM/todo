import { addProjectEventList } from "./modules/project";
import { addEventList } from "./modules/todo";
import { displayAllTodos } from "./modules/home";

// add project event listeners
addProjectEventList();

// add todo event listeners
addEventList();

// display all todos
displayAllTodos();

// hide navbar event listener
const hideNavbar =  document.querySelector('.hiddenNavbar');
hideNavbar.addEventListener('click', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('hidden');
});

// on start check if light or dark mode
const checkbox = document.getElementById('checkbox');
if (checkbox.checked === checked) {
    document.body.classList.add('dark');
} else {
    document.body.classList.remove('dark');
}

// event listener for light/dark mode
checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});

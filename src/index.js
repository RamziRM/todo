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
// what is wrong with this? 
// answer: the event listener is added before the element is created
// so the event listener is added to null
// fix: add the event listener after the element is created
// solution: add the event listener in the module that creates the element
const navbarBtn =  document.querySelector('.sidebar-toggle');
navbarBtn.addEventListener('click', () => {
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

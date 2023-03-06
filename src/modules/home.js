import { addDays, format, isEqual, isWithinInterval } from "date-fns";
import parseISO from "date-fns/parseISO";
import { projectList, hideAddTodoForm } from "./project";
import { addTodo } from "./todo";

// clear content
const clearContent = () => {
    const ul = document.querySelector('ul');
    ul.textContent = '';
}

// display all todos
const displayAllTodos = () => {
    // clearContent();
    // checkNoTodos();
    projectList.forEach((project) => {
        project.todoList.forEach((todo) => {
            addTodo(todo.todo, todo.description, todo.dueDate, todo.priority, todo.todoProject, todo.todoId);
        });
    });
}

// display todos for today
const displayToday = () => {
    // clearContent();
    projectList.forEach((project) => {
        project.todoList.forEach((todo) => {
            if (isEqual(parseISO(todo.dueDate), new Date())) {
                addTodo(todo.todo, todo.description, todo.dueDate, todo.priority, todo.todoProject, todo.todoId);
            }
        });
    });
}

// display todos for this next week
const displayNextWeek = () => {
    // clearContent();
    // Cant clear content of null element, so check if there are any todos
    checkNoTodos();
    projectList.forEach((project) => {
        project.todoList.forEach((todo) => {
            if (isWithinInterval(parseISO(todo.dueDate), { start: new Date(), end: addDays(new Date(), 7) })) {
                addTodo(todo.todo, todo.description, todo.dueDate, todo.priority, todo.todoProject, todo.todoId);
            }
        });
    });
}

// check no todos
const checkNoTodos = () => {
    const ul = document.querySelector('ul');
    const noTodos = document.createElement('p');
    noTodos.classList.add('noTodos');
    noTodos.textContent = 'No todos to display';
    ul.appendChild(noTodos);
}

export { displayAllTodos, displayToday, displayNextWeek, checkNoTodos };
import { projectList, saveToLocalStorage } from "./project.js";

// CreateTodo factory function
const CreateTodo = (todoProject, id, todo, completed, date) => {
    return {
        todoProject,
        id,
        todo,
        completed: completed,
        date: date
    }
}

// Add eventlisteners to DOM
function addEventList() {
    const addTodo = document.querySelector("#addTodo");
    addTodo.addEventListener("click", showTodoForm);

    const cancelTodo = document.querySelector("#todoCancelBtn");
    cancelTodo.addEventListener("click", hideTodoForm);
    cancelTodo.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            hideTodoForm();
        }
    });

    const submitTodo = document.querySelector("#todoSubmitBtn");
    submitTodo.addEventListener("submit", processTodoInput);
    submitTodo.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            processTodoInput(e);
        }
    });
}


// popup add todo form
const showTodoForm = () => {
    const todoForm = document.querySelector("#todoForm");
    todoForm.classList.remove("hidden");
    document.getElementById('todoInput').focus();
}

// hide add-todo form
const hideTodoForm = () => {
    const todoForm = document.querySelector("#todoForm");
    todoForm.classList.add("hidden");

    // clear input fields
    document.querySelector("#todoInput").value = "";
    document.querySelector("#todoInputDate").value = "";
}

// process todo input
const processTodoInput = (e) => {
    e.preventDefault();

    let todo = document.querySelector("#todoInput").value;
    let dateInput = document.querySelector("#todoInputDate").value;

    let todoProject =  findCurrentProject();
    let date = processDate(dateInput);
    let todoId = id;

    // create new todo object and add to todo array -- with processed inputs
    const newTodo = CreateTodo(todoProject, todoId, todo, false, date);
    projectList[todoProject].todoList.push(newTodo);
    id = id + 1;
    saveToLocalStorage();

    // add todo to DOM
    addTodo(todoProject, todoId, todo, false, date);
    hideTodoForm();
    e.preventDefault();
}

// process date input and set due date if not set
const processDate = (date) => {
    let formattedDate;
    if (date === "") {
        formattedDate = "No due date";
    }
    else {
        formattedDate = date;
    }
    return formattedDate;
}

// display all todos in project
const displayTodoList = (array) => {
    const ul = document.querySelector("ul");
    ul.textContent = "";
    array.forEach((todo) => {
        addTodo(todo.todoProject, todo.id, todo.todo, todo.completed, todo.date);
    });
}

// create todo in DOM html
const addTodo = (todoProject, todoId, todo, completed, date) => {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.id = todoId;
    ul.appendChild(li);

    const div = document.createElement("div");
    div.classList.add("todo");
    li.appendChild(div);

}

// find current project
const findCurrentProject = () => {
    let currentProject = document.querySelector(".currentProject");
    return currentProject.dataset.project;
}

export { addEventList, processTodoInput, idGenerator, findCurrentProject, CreateTodo, displayTodoList, processDate, showTodoForm, hideTodoForm}
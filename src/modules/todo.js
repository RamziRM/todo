// import

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
    let todoId = idGenerator();

    // create new todo object and add to todo array -- with processed inputs
    const newTodo = CreateTodo(todoProject, todoId, todo, false, date);

}